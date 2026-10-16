import React, { useState, useEffect } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  Lock,
  Shield,
  ShieldAlert,
  LogOut,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  Trash2,
  Download,
  X,
  ArrowLeft,
  ChevronDown,
  Layers,
  Flame,
  Snowflake,
  Wrench,
  UserCheck,
} from 'lucide-react';
import { auth } from '../firebase';
import { quoteService, AUTHORIZED_ADMIN_EMAILS } from '../services/quoteService';
import { QuoteRequest, RequestStatus } from '../types';
import { Logo } from './Logo';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Data & filters
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected request modal
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthLoading(true);
      setLoginError(null);

      if (user) {
        try {
          const verified = await quoteService.verifyAdmin(user);
          setIsAdmin(verified);
          if (!verified) {
            setLoginError(
              `Le compte ${user.email} est connecté avec succès mais n'est pas autorisé comme administrateur.`
            );
          }
        } catch (err) {
          console.error('Erreur vérification admin:', err);
          setIsAdmin(false);
          setLoginError('Impossible de vérifier les privilèges administrateur.');
        }
      } else {
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to real-time quote requests if admin
  useEffect(() => {
    if (!isAdmin) {
      setRequests([]);
      return;
    }

    setDataLoading(true);
    setDataError(null);

    const unsubscribe = quoteService.subscribeToRequests(
      (data) => {
        setRequests(data);
        setDataLoading(false);
        setDataError(null);
        // Sync selected request if open
        if (selectedRequest) {
          const updated = data.find((r) => r.id === selectedRequest.id);
          if (updated) setSelectedRequest(updated);
        }
      },
      (err) => {
        console.error('Erreur chargement Firestore:', err);
        setDataLoading(false);
        setDataError('Accès refusé ou erreur de connexion à Cloud Firestore.');
      }
    );

    return () => unsubscribe();
  }, [isAdmin]);

  const handleGoogleSignIn = async () => {
    setLoginError(null);
    setAuthLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Erreur connexion Google:', err);
      setLoginError(err.message || 'La connexion avec Google a échoué.');
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSelectedRequest(null);
      setIsAdmin(false);
      setRequests([]);
    } catch (err) {
      console.error('Erreur déconnexion:', err);
    }
  };

  const handleStatusChange = async (newStatus: RequestStatus) => {
    if (!selectedRequest) return;
    setUpdatingStatus(true);
    try {
      await quoteService.updateStatus(selectedRequest.id, newStatus);
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    } catch (err) {
      alert('Erreur lors de la mise à jour du statut dans Firestore.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !newNote.trim()) return;

    setAddingNote(true);
    try {
      await quoteService.addNote(selectedRequest.id, newNote.trim(), selectedRequest.notes || []);
      setNewNote('');
    } catch (err) {
      alert('Erreur lors de l’ajout de la note interne.');
    } finally {
      setAddingNote(false);
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer définitivement cette demande de devis ?')) {
      try {
        await quoteService.deleteRequest(id);
        setSelectedRequest(null);
      } catch (err) {
        alert('Erreur lors de la suppression de la demande dans Firestore.');
      }
    }
  };

  const exportCSV = () => {
    if (requests.length === 0) return;
    const headers = [
      'Reference',
      'Client',
      'Telephone',
      'Email',
      'Prestation',
      'Type',
      'Ville',
      'Adresse',
      'ContactPrefere',
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
      `"${r.address || ''}"`,
      `"${r.preferredContact}"`,
      `"${r.status}"`,
      `"${new Date(r.createdAt).toLocaleString('fr-FR')}"`,
      `"${r.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MN_Solution_Energie_Devis_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = selectedStatus === 'all' || req.status === selectedStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      req.customerName.toLowerCase().includes(q) ||
      req.phone.includes(q) ||
      (req.email && req.email.toLowerCase().includes(q)) ||
      req.reference.toLowerCase().includes(q) ||
      req.city.toLowerCase().includes(q) ||
      req.description.toLowerCase().includes(q);

    return matchesStatus && matchesQuery;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'nouveau':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Nouveau
          </span>
        );
      case 'contacte':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            Contacté
          </span>
        );
      case 'devis_envoye':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            Devis envoyé
          </span>
        );
      case 'visite_programmee':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            Visite planifiée
          </span>
        );
      case 'termine':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Terminé
          </span>
        );
      case 'annule':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Annulé
          </span>
        );
      case 'archive':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            Archivé
          </span>
        );
      default:
        return null;
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'chauffage':
        return <Flame className="w-3.5 h-3.5 text-[#C87D55]" />;
      case 'climatisation':
        return <Snowflake className="w-3.5 h-3.5 text-sky-500" />;
      case 'plomberie':
        return <Wrench className="w-3.5 h-3.5 text-[#B56C45]" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  // 1. Loading state during initial Firebase Auth resolution
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#C87D55] border-t-transparent animate-spin mx-auto" />
          <h2 className="text-lg font-bold text-[#0F1E36]">Vérification de l'accès sécurisé...</h2>
          <p className="text-xs text-slate-500">Connexion à Firebase Authentication</p>
        </div>
      </div>
    );
  }

  // 2. Not Logged In OR Unauthorized User State
  if (!currentUser || !isAdmin) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8">
        {/* Top Header */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour au site public</span>
          </button>
          <Logo size="sm" variant="light" showSubtitle={false} />
        </div>

        {/* Center Card */}
        <div className="max-w-md w-full mx-auto bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/80 text-[#C87D55] flex items-center justify-center mx-auto mb-5 shadow-xs">
            {currentUser && !isAdmin ? (
              <ShieldAlert className="w-8 h-8 text-rose-600" />
            ) : (
              <Lock className="w-8 h-8" />
            )}
          </div>

          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700 mb-2">
              Portail d'Administration Sécurisé
            </span>
            <h1 className="text-2xl font-black text-[#0F1E36]">
              {currentUser && !isAdmin ? 'Accès Refusé' : 'Espace Gestionnaire'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
              {currentUser && !isAdmin
                ? `Vous êtes connecté avec l'adresse ${currentUser.email}, mais ce compte ne possède pas de droits administrateur pour MN Solution Énergie.`
                : 'Accès strictement réservé aux gérants de MN Solution Énergie pour consulter et traiter les devis clients.'}
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 mb-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">{loginError}</div>
            </div>
          )}

          {/* Action based on status */}
          {!currentUser ? (
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full min-h-[50px] flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#0F1E36] hover:bg-[#1E3A8A] active:scale-95 text-white font-bold text-sm transition-all shadow-md focus-visible:ring-2 focus-visible:ring-[#C87D55]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Se connecter avec Google</span>
              </button>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed text-center">
                <Shield className="w-3.5 h-3.5 text-[#C87D55] inline mr-1" />
                Vérification stricte par Firebase Authentication & Firestore Security Rules.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-sm transition-all focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Se déconnecter et changer de compte</span>
              </button>

              <button
                type="button"
                onClick={onBackToSite}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0F1E36] text-white font-bold text-sm transition-all"
              >
                <span>Retour au site</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="max-w-7xl mx-auto w-full text-center text-xs text-slate-500">
          MN Solution Énergie • Base de données Cloud Firestore Enterprise
        </div>
      </div>
    );
  }

  // 3. Authenticated Administrator Dashboard
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0F1E36] text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToSite}
              className="min-h-[40px] px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
              title="Retour au site public"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Site public</span>
            </button>
            <div className="h-5 w-px bg-white/20 hidden sm:block" />
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>Tableau de Bord</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C87D55] text-white">
                Admin
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <div className="text-xs font-bold text-white flex items-center gap-1.5 justify-end">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{currentUser.displayName || currentUser.email}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {currentUser.email}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="min-h-[40px] px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 active:bg-rose-700 text-xs font-bold text-white flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-white"
              title="Déconnexion"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: 'Total demandes', count: requests.length, color: 'text-[#0F1E36]', bg: 'bg-white' },
            {
              label: 'Nouveaux',
              count: requests.filter((r) => r.status === 'nouveau').length,
              color: 'text-amber-600',
              bg: 'bg-amber-50/60',
            },
            {
              label: 'Contactés',
              count: requests.filter((r) => r.status === 'contacte').length,
              color: 'text-sky-600',
              bg: 'bg-sky-50/60',
            },
            {
              label: 'Visites planifiées',
              count: requests.filter((r) => r.status === 'visite_programmee').length,
              color: 'text-purple-600',
              bg: 'bg-purple-50/60',
            },
            {
              label: 'Devis envoyés',
              count: requests.filter((r) => r.status === 'devis_envoye').length,
              color: 'text-indigo-600',
              bg: 'bg-indigo-50/60',
            },
            {
              label: 'Terminés',
              count: requests.filter((r) => r.status === 'termine').length,
              color: 'text-emerald-600',
              bg: 'bg-emerald-50/60',
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl border border-slate-200/80 shadow-xs ${stat.bg} flex flex-col justify-between`}
            >
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>
              <span className={`text-2xl font-black mt-1 ${stat.color}`}>{stat.count}</span>
            </div>
          ))}
        </div>

        {/* Database Error Banner */}
        {dataError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-sm flex items-start gap-3 shadow-xs">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <strong className="font-bold block">Erreur de base de données Firestore :</strong>
              <p className="text-xs text-rose-700 mt-0.5">{dataError}</p>
            </div>
          </div>
        )}

        {/* Filter and Search Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom, téléphone, email, référence, ville..."
                className="w-full min-h-[42px] pl-10 pr-9 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C87D55]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2.5 self-end md:self-auto">
              <button
                type="button"
                onClick={exportCSV}
                disabled={requests.length === 0}
                className="min-h-[42px] px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-xs disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Exporter CSV</span>
              </button>
            </div>
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'Toutes les demandes' },
              { id: 'nouveau', label: 'Nouveaux' },
              { id: 'contacte', label: 'Contactés' },
              { id: 'devis_envoye', label: 'Devis envoyés' },
              { id: 'visite_programmee', label: 'Visites planifiées' },
              { id: 'termine', label: 'Terminés' },
              { id: 'annule', label: 'Annulés' },
            ].map((f) => (
              <button
                type="button"
                key={f.id}
                onClick={() => setSelectedStatus(f.id)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#C87D55] ${
                  selectedStatus === f.id
                    ? 'bg-[#0F1E36] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table / Content Area */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {dataLoading ? (
            <div className="p-12 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#C87D55] animate-spin mx-auto" />
              <p className="text-sm font-semibold text-slate-600">Chargement des demandes en temps réel...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            /* Clear Empty State */
            <div className="p-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#0F1E36]">Aucune demande de devis trouvée</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                {searchQuery || selectedStatus !== 'all'
                  ? 'Aucun résultat ne correspond à vos filtres de recherche actuels.'
                  : 'Aucune demande client n\'a encore été soumise sur votre site.'}
              </p>
              {(searchQuery || selectedStatus !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStatus('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          ) : (
            /* Table View */
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                    <th className="p-3.5 sm:px-4">Réf & Date</th>
                    <th className="p-3.5 sm:px-4">Client</th>
                    <th className="p-3.5 sm:px-4">Contact</th>
                    <th className="p-3.5 sm:px-4">Prestation</th>
                    <th className="p-3.5 sm:px-4">Localisation</th>
                    <th className="p-3.5 sm:px-4">Statut</th>
                    <th className="p-3.5 sm:px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      onClick={() => setSelectedRequest(req)}
                    >
                      <td className="p-3.5 sm:px-4">
                        <div className="font-mono font-bold text-[#0F1E36] group-hover:text-[#C87D55] transition-colors">
                          {req.reference}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(req.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </div>
                      </td>

                      <td className="p-3.5 sm:px-4">
                        <div className="font-extrabold text-[#0F1E36]">{req.customerName}</div>
                        <div className="text-[11px] text-slate-400 capitalize">{req.projectType}</div>
                      </td>

                      <td className="p-3.5 sm:px-4">
                        <div className="font-semibold text-slate-800">{req.phone}</div>
                        {req.email ? (
                          <div className="text-[11px] text-slate-500 truncate max-w-[140px]">{req.email}</div>
                        ) : (
                          <div className="text-[10px] text-slate-400 italic">Pas d'email</div>
                        )}
                      </td>

                      <td className="p-3.5 sm:px-4">
                        <span className="inline-flex items-center gap-1.5 font-bold capitalize text-slate-800">
                          {getServiceIcon(req.service)}
                          {req.service}
                        </span>
                      </td>

                      <td className="p-3.5 sm:px-4">
                        <div className="font-medium text-slate-700">{req.city}</div>
                        {req.address && (
                          <div className="text-[11px] text-slate-400 truncate max-w-[120px]">{req.address}</div>
                        )}
                      </td>

                      <td className="p-3.5 sm:px-4">{getStatusBadge(req.status)}</td>

                      <td className="p-3.5 sm:px-4 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRequest(req);
                          }}
                          className="min-h-[36px] px-3 py-1.5 rounded-lg bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white text-xs font-bold transition-all shadow-2xs"
                        >
                          Ouvrir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Selected Request Detail Drawer/Modal */}
      {selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedRequest(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#0F1E36] text-white p-5 sm:p-6 flex items-start justify-between gap-4 shrink-0">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xl font-black text-white">{selectedRequest.customerName}</span>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <div className="text-xs text-slate-300 font-mono mt-1">
                  Réf : {selectedRequest.reference} • Reçue le{' '}
                  {new Date(selectedRequest.createdAt).toLocaleString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                aria-label="Fermer la vue détaillée"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
              {/* Quick Customer Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${selectedRequest.phone.replace(/\s+/g, '')}`}
                  className="min-h-[44px] flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 hover:bg-[#C87D55] hover:text-white text-slate-900 font-bold text-xs sm:text-sm transition-colors border border-slate-200"
                >
                  <Phone className="w-4 h-4 text-[#C87D55] group-hover:text-white" />
                  <span>Appeler {selectedRequest.phone}</span>
                </a>

                {selectedRequest.email ? (
                  <a
                    href={`mailto:${selectedRequest.email}?subject=Devis MN Solution Énergie réf ${selectedRequest.reference}`}
                    className="min-h-[44px] flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-900 font-bold text-xs sm:text-sm transition-colors border border-slate-200"
                  >
                    <Mail className="w-4 h-4 text-sky-600" />
                    <span className="truncate">{selectedRequest.email}</span>
                  </a>
                ) : (
                  <div className="min-h-[44px] flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-50 text-slate-400 text-xs border border-slate-200">
                    <span>Aucune adresse email fournie</span>
                  </div>
                )}
              </div>

              {/* Status Update Control */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1E36]">
                  Mettre à jour le statut du dossier
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={selectedRequest.status}
                    onChange={(e) => handleStatusChange(e.target.value as RequestStatus)}
                    disabled={updatingStatus}
                    className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold bg-white text-[#0F1E36] focus:outline-none focus:ring-2 focus:ring-[#C87D55]"
                  >
                    <option value="nouveau">Statut : Nouveau</option>
                    <option value="contacte">Statut : Contacté</option>
                    <option value="devis_envoye">Statut : Devis envoyé</option>
                    <option value="visite_programmee">Statut : Visite planifiée</option>
                    <option value="termine">Statut : Terminé</option>
                    <option value="annule">Statut : Annulé</option>
                    <option value="archive">Statut : Archivé</option>
                  </select>
                  {updatingStatus && <RefreshCw className="w-4 h-4 animate-spin text-[#C87D55]" />}
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block font-medium">Prestation</span>
                  <span className="font-extrabold capitalize text-[#0F1E36] flex items-center gap-1 mt-0.5">
                    {getServiceIcon(selectedRequest.service)}
                    {selectedRequest.service}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Type d'intervention</span>
                  <span className="font-extrabold capitalize text-[#0F1E36] mt-0.5 block">
                    {selectedRequest.projectType}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Moyen de contact préféré</span>
                  <span className="font-extrabold capitalize text-[#0F1E36] mt-0.5 block">
                    {selectedRequest.preferredContact}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-3 pt-2 border-t border-slate-200/60">
                  <span className="text-slate-400 block font-medium">Adresse & Ville du chantier</span>
                  <span className="font-bold text-[#0F1E36] flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C87D55]" />
                    {selectedRequest.city} {selectedRequest.address ? `• ${selectedRequest.address}` : ''}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Descriptif du besoin client :
                </h4>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed shadow-xs">
                  {selectedRequest.description}
                </div>
              </div>

              {/* Private Internal Notes */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                  <span>Notes internes artisan ({selectedRequest.notes?.length || 0})</span>
                  <span className="text-[10px] text-amber-700 font-semibold lowercase">Privées & sécurisées</span>
                </h4>

                {selectedRequest.notes && selectedRequest.notes.length > 0 ? (
                  <div className="space-y-2">
                    {selectedRequest.notes.map((note, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-slate-800 font-medium"
                      >
                        {note}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">Aucune note interne pour l'instant.</p>
                )}

                <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Ajouter une note (ex: Client contacté, devis envoyé à 450€...)"
                    className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C87D55]"
                  />
                  <button
                    type="submit"
                    disabled={addingNote || !newNote.trim()}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white font-bold text-xs transition-all disabled:opacity-50"
                  >
                    {addingNote ? 'Ajout...' : 'Ajouter'}
                  </button>
                </form>
              </div>

              {/* Delete Action */}
              <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => handleDeleteRequest(selectedRequest.id)}
                  className="min-h-[40px] px-3.5 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Supprimer cette demande</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="min-h-[40px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
