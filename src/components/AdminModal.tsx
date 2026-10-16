import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  X,
  Search,
  Phone,
  Mail,
  Trash2,
  Database,
  Shield,
  Download,
  ArrowLeft,
  Loader2,
  LogOut,
  AlertTriangle,
  RefreshCw,
  Plus,
  Calendar,
  MapPin,
  CheckCircle,
} from 'lucide-react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from '../firebase';
import { QuoteRequest, RequestStatus } from '../types';
import { quoteService, AUTHORIZED_ADMIN_EMAILS } from '../services/quoteService';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminVerified, setIsAdminVerified] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string>('');

  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState<boolean>(false);
  const [dbError, setDbError] = useState<string>('');

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRequest, setActiveRequest] = useState<QuoteRequest | null>(null);
  const [newNote, setNewNote] = useState('');
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [mobileDetailView, setMobileDetailView] = useState(false);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  // Listen to Firebase Auth state
  useEffect(() => {
    if (!isOpen) return;

    setAuthLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const verified = await quoteService.verifyAdmin(user);
          setIsAdminVerified(verified);
          if (!verified) {
            setAuthError(
              `Le compte ${user.email || user.uid} n'est pas autorisé comme administrateur.`
            );
          } else {
            setAuthError('');
          }
        } catch (err) {
          console.error('Erreur de vérification des droits admin:', err);
          setIsAdminVerified(false);
          setAuthError('Impossible de vérifier les privilèges administrateur.');
        }
      } else {
        setIsAdminVerified(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [isOpen]);

  // Subscribe to real-time Firestore requests once admin is verified
  useEffect(() => {
    if (!isOpen || !isAdminVerified || !currentUser) {
      setRequests([]);
      return;
    }

    setRequestsLoading(true);
    setDbError('');

    const unsubscribe = quoteService.subscribeToRequests(
      (data) => {
        setRequests(data);
        setRequestsLoading(false);
        setActiveRequest((prev) => {
          if (!prev && data.length > 0) return data[0];
          if (prev) {
            const updated = data.find((r) => r.id === prev.id);
            return updated || data[0] || null;
          }
          return null;
        });
      },
      (error) => {
        console.error('Erreur Firestore subscription:', error);
        setDbError('Erreur de synchronisation avec la base de données Firestore.');
        setRequestsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [isOpen, isAdminVerified, currentUser]);

  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      const verified = await quoteService.verifyAdmin(result.user);
      setIsAdminVerified(verified);
      if (!verified) {
        setAuthError(
          `Le compte ${result.user.email} n'est pas autorisé. Utilisez un compte administrateur référencé.`
        );
      }
    } catch (err: unknown) {
      console.error('Erreur de connexion Google:', err);
      const message = err instanceof Error ? err.message : String(err);
      if (!message.includes('popup-closed-by-user')) {
        setAuthError('Échec de la connexion Google. Veuillez réessayer.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setIsAdminVerified(false);
      setRequests([]);
      setActiveRequest(null);
      setAuthError('');
    } catch (err) {
      console.error('Erreur de déconnexion:', err);
    }
  };

  const handleStatusChange = async (id: string, newStatus: RequestStatus) => {
    setActionLoading(true);
    try {
      await quoteService.updateStatus(id, newStatus);
    } catch (err) {
      console.error('Erreur de mise à jour du statut:', err);
      alert('Impossible de mettre à jour le statut dans Firestore.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddNote = async (id: string) => {
    if (!newNote.trim() || !activeRequest) return;
    setActionLoading(true);
    try {
      await quoteService.addNote(id, newNote.trim(), activeRequest.notes || []);
      setNewNote('');
    } catch (err) {
      console.error('Erreur d’ajout de note:', err);
      alert('Impossible d’enregistrer la note dans Firestore.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette demande de devis ? Cette action est irréversible.')) {
      return;
    }
    setActionLoading(true);
    try {
      await quoteService.deleteRequest(id);
      setMobileDetailView(false);
    } catch (err) {
      console.error('Erreur de suppression:', err);
      alert('Impossible de supprimer la demande.');
    } finally {
      setActionLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = [
      'Reference',
      'Client',
      'Telephone',
      'Email',
      'Prestation',
      'Type',
      'Ville',
      'Statut',
      'DateCreation',
      'Description',
    ];
    const rows = requests.map((r) => [
      `"${r.reference}"`,
      `"${r.customerName}"`,
      `"${r.phone}"`,
      `"${r.email || ''}"`,
      `"${r.service}"`,
      `"${r.projectType}"`,
      `"${r.city}"`,
      `"${r.status}"`,
      `"${new Date(r.createdAt).toLocaleString('fr-FR')}"`,
      `"${r.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `MN_Solution_Energie_Devis_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      req.customerName.toLowerCase().includes(query) ||
      req.phone.includes(query) ||
      req.reference.toLowerCase().includes(query) ||
      req.city.toLowerCase().includes(query);

    return matchesStatus && matchesQuery;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'nouveau':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            Nouveau
          </span>
        );
      case 'contacte':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
            Contacté
          </span>
        );
      case 'visite_programmee':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
            Visite programmée
          </span>
        );
      case 'devis_envoye':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
            Devis envoyé
          </span>
        );
      case 'termine':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            Terminé
          </span>
        );
      case 'annule':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            Annulé
          </span>
        );
      case 'archive':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            Archivé
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div
        className="relative w-full max-w-5xl h-[94vh] sm:h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="bg-[#0F1E36] text-white p-3.5 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#C87D55] flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 id="admin-modal-title" className="font-extrabold text-sm sm:text-lg leading-tight">
                Tableau de bord Administrateur • MN Solution Énergie
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 hidden xs:block">
                Gestion sécurisée des demandes de devis et synchronisation Firestore
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && isAdminVerified && (
              <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-slate-200 truncate max-w-[150px] font-medium">
                  {currentUser.email}
                </span>
                <button
                  type="button"
                  onClick={handleSignOut}
                  title="Déconnexion"
                  className="p-1 hover:text-rose-300 transition-colors ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Fermer le tableau de bord"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Database Error Banner */}
        {dbError && (
          <div className="bg-rose-50 border-b border-rose-200 p-3 text-xs text-rose-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{dbError}</span>
          </div>
        )}

        {/* STATE 1: LOADING AUTH */}
        {authLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#C87D55] mb-3" />
            <p className="text-sm font-semibold">Vérification de l'authentification Firebase...</p>
          </div>
        ) : !currentUser ? (
          /* STATE 2: NOT SIGNED IN */
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-slate-50 overflow-y-auto">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md text-center">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-[#C87D55] flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <Lock className="w-7 h-7" />
              </div>

              <h4 className="text-xl font-bold text-[#0F1E36]">
                Accès Administrateur Sécurisé
              </h4>
              <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed">
                Connectez-vous avec votre compte Google autorisé pour accéder aux demandes de devis clients et aux données de gestion.
              </p>

              {authError && (
                <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 text-left flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-3 focus-visible:ring-2 focus-visible:ring-[#C87D55]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Se connecter avec Google</span>
              </button>

              <div className="mt-6 pt-5 border-t border-slate-100 text-left text-[11px] text-slate-400 space-y-1.5">
                <p className="font-semibold text-slate-500">Comptes gestionnaires déclarés :</p>
                {AUTHORIZED_ADMIN_EMAILS.map((email) => (
                  <p key={email} className="font-mono text-slate-600">
                    • {email}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ) : !isAdminVerified ? (
          /* STATE 3: SIGNED IN BUT NOT ADMIN */
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-slate-50">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl border border-rose-200 shadow-md text-center">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
                <AlertTriangle className="w-7 h-7" />
              </div>

              <h4 className="text-lg font-bold text-slate-900">
                Accès Non Autorisé
              </h4>
              <p className="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">
                Le compte <strong className="text-slate-800">{currentUser.email}</strong> n’a pas les autorisations nécessaires pour accéder à l’administration de MN Solution Énergie.
              </p>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 text-left mb-6">
                Pour des raisons de confidentialité et de respect du RGPD, les coordonnées des clients demandant un devis ne sont visibles que par l'artisan référent.
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Se déconnecter et changer de compte</span>
              </button>
            </div>
          </div>
        ) : (
          /* STATE 4: AUTHENTICATED & VERIFIED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50">
            {/* Left Column: Requests list */}
            <div
              className={`w-full md:w-5/12 border-r border-slate-200 bg-white flex flex-col h-full overflow-hidden ${
                mobileDetailView ? 'hidden md:flex' : 'flex'
              }`}
            >
              {/* Controls bar */}
              <div className="p-3 border-b border-slate-100 space-y-2.5 bg-slate-50/70 shrink-0">
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-slate-400 absolute left-3 top-3"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher (nom, tél, réf, ville)..."
                    className="w-full min-h-[38px] pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#C87D55]"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: 'all', label: 'Tous' },
                    { id: 'nouveau', label: 'Nouveaux' },
                    { id: 'contacte', label: 'Contactés' },
                    { id: 'visite_programmee', label: 'Visites' },
                    { id: 'devis_envoye', label: 'Devis' },
                    { id: 'termine', label: 'Terminés' },
                    { id: 'annule', label: 'Annulés' },
                  ].map((filter) => (
                    <button
                      type="button"
                      key={filter.id}
                      onClick={() => setSelectedStatus(filter.id)}
                      className={`min-h-[34px] px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-[#C87D55] ${
                        selectedStatus === filter.id
                          ? 'bg-[#0F1E36] text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                {requestsLoading ? (
                  <div className="p-8 text-center text-slate-400 text-xs flex flex-col items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-[#C87D55] mb-2" />
                    <span>Chargement des demandes Firestore...</span>
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs flex flex-col items-center">
                    <Database className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">Aucune demande trouvée</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Les demandes soumises par les clients s'afficheront ici en temps réel.
                    </p>
                  </div>
                ) : (
                  filteredRequests.map((req) => {
                    const isSelected = activeRequest?.id === req.id;
                    return (
                      <div
                        key={req.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setActiveRequest(req);
                          setMobileDetailView(true);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setActiveRequest(req);
                            setMobileDetailView(true);
                          }
                        }}
                        className={`p-3.5 cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55] focus:outline-none ${
                          isSelected
                            ? 'bg-amber-50/70 border-l-4 border-[#C87D55]'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-[11px] font-bold text-slate-500">
                            {req.reference}
                          </span>
                          {getStatusBadge(req.status)}
                        </div>

                        <div className="font-extrabold text-sm text-[#0F1E36] truncate">
                          {req.customerName}
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                          <span className="capitalize font-medium text-[#C87D55]">
                            {req.service}
                          </span>
                          <span>{req.city}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom stats & export */}
              <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500 shrink-0">
                <span>{filteredRequests.length} demande(s)</span>
                <button
                  type="button"
                  onClick={exportCSV}
                  disabled={requests.length === 0}
                  className="min-h-[36px] inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold text-[#0F1E36] hover:text-[#C87D55] disabled:opacity-40 disabled:hover:text-[#0F1E36] focus-visible:ring-1 focus-visible:ring-[#C87D55] rounded"
                >
                  <Download className="w-3.5 h-3.5" /> Exporter CSV
                </button>
              </div>
            </div>

            {/* Right Column: Detailed Request view */}
            <div
              className={`w-full md:w-7/12 flex-1 flex flex-col h-full overflow-y-auto p-4 sm:p-6 bg-white ${
                mobileDetailView ? 'flex' : 'hidden md:flex'
              }`}
            >
              {/* Back button on mobile */}
              <div className="md:hidden pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMobileDetailView(false)}
                  className="min-h-[44px] flex items-center gap-1.5 text-xs font-bold text-[#0F1E36]"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour à la liste</span>
                </button>
              </div>

              {activeRequest ? (
                <div className="space-y-5 sm:space-y-6">
                  {/* Header of request */}
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-lg sm:text-xl font-black text-[#0F1E36]">
                          {activeRequest.customerName}
                        </span>
                        {getStatusBadge(activeRequest.status)}
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-1">
                        Réf : {activeRequest.reference} • Reçue le{' '}
                        {new Date(activeRequest.createdAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={activeRequest.status}
                        disabled={actionLoading}
                        onChange={(e) =>
                          handleStatusChange(activeRequest.id, e.target.value as RequestStatus)
                        }
                        className="min-h-[40px] px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-[#C87D55]"
                        aria-label="Modifier le statut de la demande"
                      >
                        <option value="nouveau">Statut : Nouveau</option>
                        <option value="contacte">Statut : Client contacté</option>
                        <option value="visite_programmee">Statut : Visite programmée</option>
                        <option value="devis_envoye">Statut : Devis envoyé</option>
                        <option value="termine">Statut : Travaux terminés</option>
                        <option value="annule">Statut : Annulé</option>
                        <option value="archive">Statut : Archivé</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => handleDelete(activeRequest.id)}
                        disabled={actionLoading}
                        className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus-visible:ring-1 focus-visible:ring-rose-500 disabled:opacity-40"
                        title="Supprimer la demande"
                        aria-label="Supprimer la demande de devis"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Customer Quick Dial & Email Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    <a
                      href={`tel:${activeRequest.phone.replace(/\s+/g, '')}`}
                      className="min-h-[44px] flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#C87D55] hover:bg-amber-50/40 text-slate-800 font-bold text-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                    >
                      <Phone className="w-4 h-4 text-[#C87D55]" />
                      <span>{activeRequest.phone}</span>
                    </a>

                    {activeRequest.email ? (
                      <a
                        href={`mailto:${activeRequest.email}?subject=Devis MN Solution Énergie réf ${activeRequest.reference}`}
                        className="min-h-[44px] flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#C87D55] hover:bg-amber-50/40 text-slate-800 font-bold text-xs transition-colors focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                      >
                        <Mail className="w-4 h-4 text-sky-600" />
                        <span className="truncate">{activeRequest.email}</span>
                      </a>
                    ) : (
                      <div className="min-h-[44px] flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 text-xs">
                        <span>Email non renseigné</span>
                      </div>
                    )}
                  </div>

                  {/* Project overview card */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Prestation</span>
                        <span className="font-extrabold capitalize text-[#0F1E36]">
                          {activeRequest.service}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Type de besoin</span>
                        <span className="font-extrabold capitalize text-[#0F1E36]">
                          {activeRequest.projectType}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Lieu du chantier</span>
                        <span className="font-extrabold text-[#0F1E36]">
                          {activeRequest.city}{' '}
                          {activeRequest.address ? `(${activeRequest.address})` : ''}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200">
                      <span className="text-xs text-slate-400 block font-medium mb-1">
                        Descriptif du client :
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed bg-white p-3 rounded-lg border border-slate-200/80">
                        {activeRequest.description}
                      </p>
                    </div>
                  </div>

                  {/* Internal technician notes */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Notes internes du technicien ({activeRequest.notes?.length || 0})
                    </h4>

                    {activeRequest.notes && activeRequest.notes.length > 0 ? (
                      <div className="space-y-2">
                        {activeRequest.notes.map((note, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/70 text-xs text-slate-700 font-medium"
                          >
                            {note}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        Aucune note interne enregistrée pour ce dossier.
                      </p>
                    )}

                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Ajouter une note (ex: Appelé le client, rdv prévu...)"
                        disabled={actionLoading}
                        className="flex-1 min-h-[44px] px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#C87D55]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddNote(activeRequest.id);
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => handleAddNote(activeRequest.id)}
                        disabled={actionLoading || !newNote.trim()}
                        className="min-h-[44px] px-4 py-2 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white text-xs font-bold transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-[#C87D55] disabled:opacity-40"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
                  Sélectionnez une demande dans la liste pour afficher les détails.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
