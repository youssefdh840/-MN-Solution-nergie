import React, { useState, useEffect } from 'react';
import {
  Lock,
  X,
  Search,
  Phone,
  Mail,
  Trash2,
  Database,
  Shield,
  Download,
  ArrowLeft,
} from 'lucide-react';
import { QuoteRequest, RequestStatus } from '../types';
import { quoteService } from '../services/quoteService';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRequest, setActiveRequest] = useState<QuoteRequest | null>(null);
  const [newNote, setNewNote] = useState('');
  const [showFirebaseGuide, setShowFirebaseGuide] = useState(false);
  const [mobileDetailView, setMobileDetailView] = useState(false);

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

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadRequests();
    }
  }, [isOpen, isAuthenticated]);

  const loadRequests = () => {
    const list = quoteService.getRequests();
    setRequests(list);
    if (list.length > 0 && !activeRequest) {
      setActiveRequest(list[0]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'MN2026' || passcode.trim() === 'admin') {
      setIsAuthenticated(true);
      setErrorMsg('');
      loadRequests();
    } else {
      setErrorMsg('Code d’accès incorrect. Veuillez saisir le code de gestion MN Solution Énergie.');
    }
  };

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    quoteService.updateStatus(id, newStatus);
    const updated = quoteService.getRequests();
    setRequests(updated);
    if (activeRequest && activeRequest.id === id) {
      setActiveRequest({ ...activeRequest, status: newStatus });
    }
  };

  const handleAddNote = (id: string) => {
    if (!newNote.trim()) return;
    quoteService.addNote(id, newNote.trim());
    setNewNote('');
    const updated = quoteService.getRequests();
    setRequests(updated);
    const current = updated.find((r) => r.id === id);
    if (current) setActiveRequest(current);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette demande ?')) {
      quoteService.deleteRequest(id);
      const updated = quoteService.getRequests();
      setRequests(updated);
      setActiveRequest(updated[0] || null);
      setMobileDetailView(false);
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

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MN_Solution_Energie_Devis_${new Date().toISOString().slice(0, 10)}.csv`);
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
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Nouveau</span>;
      case 'contacte':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800">Contacté</span>;
      case 'visite_programmee':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">Visite</span>;
      case 'devis_envoye':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">Devis envoyé</span>;
      case 'termine':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Terminé</span>;
      case 'archive':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700">Archivé</span>;
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
              <Lock className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 id="admin-modal-title" className="font-extrabold text-sm sm:text-lg leading-tight">
                Espace Artisan • MN Solution Énergie
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-300 hidden xs:block">
                Gestion des demandes de devis et suivi des dossiers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setShowFirebaseGuide(!showFirebaseGuide)}
              className="min-h-[40px] px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-xs font-semibold text-amber-200 flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-white"
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sécurité & Firebase</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Fermer l'espace gestion"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SECURITY & FIREBASE INFO BANNER */}
        {showFirebaseGuide && (
          <div className="bg-amber-50 border-b border-amber-200 p-3.5 sm:p-4 text-xs text-amber-900 animate-in slide-in-from-top duration-200 overflow-y-auto max-h-48 shrink-0">
            <div className="flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-[#C87D55] shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block mb-1">
                  Architecture de sécurité & configuration Cloud Firestore :
                </strong>
                <p className="leading-relaxed">
                  Conformément aux directives de sécurité, aucune clé de compte de service privée n'est exposée dans le frontend. Pour activer la synchronisation multi-terminaux dans le cloud :
                </p>
                <div className="mt-2 font-mono bg-white p-2.5 rounded border border-amber-200 text-[11px] text-slate-800">
                  {`// Règles Firestore recommandées pour la collection quoteRequests :
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quoteRequests/{requestId} {
      allow create: if request.resource.data.customerName != null && request.resource.data.phone != null;
      allow read, update, delete: if request.auth != null;
    }
  }
}`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NOT AUTHENTICATED STATE */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 bg-slate-50 overflow-y-auto">
            <div className="w-full max-w-sm bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-md text-center">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-[#C87D55] flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <Lock className="w-7 h-7" />
              </div>

              <h4 className="text-xl font-bold text-[#0F1E36]">
                Accès Protégé
              </h4>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Cet espace est strictement réservé aux gestionnaires de MN Solution Énergie pour consulter les demandes clients.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Code d'accès (ex: MN2026)"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 text-base sm:text-sm text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-[#C87D55]"
                    autoFocus
                  />
                  {errorMsg && (
                    <p className="text-xs text-rose-600 mt-2 text-left" role="alert">
                      {errorMsg}
                    </p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-2">
                    Code par défaut pour cette démonstration : <strong className="text-slate-600">MN2026</strong>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] py-2.5 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] active:scale-95 text-white font-bold text-sm transition-all shadow-md focus-visible:ring-2 focus-visible:ring-[#C87D55]"
                >
                  Déverrouiller l'espace gestion
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
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
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
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
                    { id: 'visite_programmee', label: 'Visite' },
                    { id: 'termine', label: 'Terminés' },
                  ].map((filter) => (
                    <button
                      type="button"
                      key={filter.id}
                      onClick={() => setSelectedStatus(filter.id)}
                      className={`min-h-[36px] px-2.5 py-1.5 rounded-md text-[11px] font-semibold whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-[#C87D55] ${
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
                {filteredRequests.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    Aucune demande trouvée.
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
                  className="min-h-[36px] inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold text-[#0F1E36] hover:text-[#C87D55] focus-visible:ring-1 focus-visible:ring-[#C87D55] rounded"
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
                        <option value="archive">Statut : Archivé</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => handleDelete(activeRequest.id)}
                        className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus-visible:ring-1 focus-visible:ring-rose-500"
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
                          {activeRequest.city} {activeRequest.address ? `(${activeRequest.address})` : ''}
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
                        className="min-h-[44px] px-4 py-2 rounded-xl bg-[#0F1E36] hover:bg-[#C87D55] text-white text-xs font-bold transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-[#C87D55]"
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
