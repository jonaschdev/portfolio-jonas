import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// =========================================================================
// 🎮 SEU PERFIL DO DISCORD (ESTILO GUNS.LOL & RICH PRESENCE)
// ID numeric do Discord:
// =========================================================================
const DISCORD_USER_ID = '1203410675674914896';
const DEFAULT_USERNAME = 'Nasu';

export default function DiscordProfileCard() {
  const [discordData, setDiscordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Converte chave de imagem de asset do Lanyard para URL completa
    const getAssetUrl = (appId, assetKey) => {
      if (!assetKey) return null;
      if (assetKey.startsWith('spotify:')) {
        return `https://i.scdn.co/image/${assetKey.replace('spotify:', '')}`;
      }
      if (assetKey.startsWith('mp:external/')) {
        return `https://media.discordapp.net/${assetKey.replace('mp:', '')}`;
      }
      if (appId) {
        return `https://cdn.discordapp.com/app-assets/${appId}/${assetKey}.png`;
      }
      return null;
    };

    async function fetchDiscordProfile() {
      if (!DISCORD_USER_ID) {
        if (isMounted) {
          setDiscordData({
            username: DEFAULT_USERNAME,
            global_name: 'Jonas Chaves',
            status: 'online',
            avatarUrl: 'https://cdn.discordapp.com/embed/avatars/0.png',
            customStatus: 'Desenvolvendo aplicações web incríveis 🚀',
            activities: [
              {
                id: 'vscode',
                name: 'Visual Studio Code',
                details: 'Desenvolvendo portfolio.jsx',
                state: 'Workspace: Jonas Portfolio',
                largeImage: 'https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/file_type_vscode.svg'
              }
            ],
            spotify: null
          });
          setLoading(false);
        }
        return;
      }

      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        const json = await res.json();

        if (json.success && json.data && isMounted) {
          const user = json.data.discord_user;
          const status = json.data.discord_status || 'offline';
          const avatarUrl = user.avatar
            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=256`
            : `https://cdn.discordapp.com/embed/avatars/${(BigInt(user.id) >> 22n) % 5n}.png`;

          // Status Customizado (Emoji + Texto)
          let customStatusText = '';
          if (json.data.custom_status?.state) {
            const emoji = json.data.custom_status.emoji?.name || '';
            customStatusText = `${emoji} ${json.data.custom_status.state}`.trim();
          }

          // Spotify
          let spotifyData = null;
          if (json.data.listening_to_spotify && json.data.spotify) {
            spotifyData = {
              trackId: json.data.spotify.track_id,
              song: json.data.spotify.song,
              artist: json.data.spotify.artist,
              album: json.data.spotify.album,
              albumArtUrl: json.data.spotify.album_art_url,
              timestamps: json.data.spotify.timestamps
            };
          }

          // Lista de Atividades Ativas (jogos, VS Code, softwares, etc)
          // Ignora status customizado (tipo 4) e Spotify (já renderizado no bloco exclusivo)
          const rawActivities = json.data.activities || [];
          const seenActivities = new Set();
          const parsedActivities = [];

          for (const a of rawActivities) {
            if (a.type === 4 || a.name?.toLowerCase() === 'spotify' || String(a.id || '').startsWith('spotify:')) {
              continue;
            }
            const uniqueKey = `${a.name}-${a.details || ''}-${a.state || ''}`;
            if (seenActivities.has(uniqueKey)) continue;
            seenActivities.add(uniqueKey);

            parsedActivities.push({
              id: a.id || a.name,
              name: a.name,
              type: a.type, // 0: Playing, 1: Streaming, 2: Listening, 3: Watching, 5: Competing
              details: a.details,
              state: a.state,
              largeImage: getAssetUrl(a.application_id, a.assets?.large_image),
              smallImage: getAssetUrl(a.application_id, a.assets?.small_image),
              largeText: a.assets?.large_text,
              smallText: a.assets?.small_text,
              timestamps: a.timestamps
            });
          }

          setDiscordData({
            username: user.username,
            global_name: user.global_name || user.username,
            status: status,
            avatarUrl: avatarUrl,
            customStatus: customStatusText,
            activities: parsedActivities,
            spotify: spotifyData
          });
        } else if (isMounted) {
          setDiscordData({
            username: DEFAULT_USERNAME,
            global_name: 'Jonas Chaves',
            status: 'online',
            avatarUrl: 'https://cdn.discordapp.com/embed/avatars/0.png',
            customStatus: 'Conectado ao Discord',
            activities: [],
            spotify: null
          });
        }
      } catch (err) {
        if (isMounted) {
          setDiscordData({
            username: DEFAULT_USERNAME,
            global_name: 'Jonas Chaves',
            status: 'online',
            avatarUrl: 'https://cdn.discordapp.com/embed/avatars/0.png',
            customStatus: 'Disponível no Discord',
            activities: [],
            spotify: null
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDiscordProfile();
    const interval = setInterval(fetchDiscordProfile, 8000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleCopyDiscord = () => {
    const tagToCopy = discordData?.username || DEFAULT_USERNAME;
    navigator.clipboard.writeText(tagToCopy);
    setCopied(true);

    const toast = document.getElementById('toastNotice');
    if (toast) {
      toast.textContent = `Discord @${tagToCopy} copiado!`;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#22c55e';
      case 'idle': return '#eab308';
      case 'dnd': return '#ef4444';
      default: return '#64748b';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'online': return 'Online no Discord';
      case 'idle': return 'Ausente';
      case 'dnd': return 'Não Perturbe';
      default: return 'Offline no momento';
    }
  };

  const isListeningSpotify = Boolean(discordData?.spotify);
  const spotifyUrl = discordData?.spotify?.trackId
    ? `https://open.spotify.com/track/${discordData.spotify.trackId}`
    : (discordData?.spotify
        ? `https://open.spotify.com/search/${encodeURIComponent(`${discordData.spotify.song} ${discordData.spotify.artist}`)}`
        : '#');

  return (
    <div className="contact-card contact-card-discord">
      <div className="contact-card-badge discord-badge">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
        <span>Meu Discord</span>
      </div>

      <div className="discord-profile-widget">
        {/* Banner de perfil minimalista Guns.lol */}
        <div className="discord-widget-header">
          <div className={`discord-avatar-wrapper ${isListeningSpotify ? 'is-listening-music' : ''}`}>
            <AnimatePresence>
              {isListeningSpotify && (
                <motion.div
                  key="floating-notes"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                  className="discord-floating-notes"
                  aria-hidden="true"
                >
                  <span className="floating-note note-1">♪</span>
                  <span className="floating-note note-2">♫</span>
                  <span className="floating-note note-3">♬</span>
                </motion.div>
              )}
            </AnimatePresence>
            <img
              src={discordData?.avatarUrl || 'https://cdn.discordapp.com/embed/avatars/0.png'}
              alt="Discord Avatar"
              className="discord-avatar-img"
            />
            <span
              className="discord-status-dot"
              style={{
                backgroundColor: isListeningSpotify ? '#1ed760' : getStatusColor(discordData?.status),
                boxShadow: `0 0 10px ${isListeningSpotify ? '#1ed760' : getStatusColor(discordData?.status)}`
              }}
              title={isListeningSpotify ? 'Ouvindo música no Spotify' : getStatusLabel(discordData?.status)}
            />
          </div>

          <div className="discord-user-info">
            <span className="discord-global-name">
              {discordData?.global_name || 'Jonas Chaves'}
            </span>
            <span className="discord-username-tag">
              @{discordData?.username || DEFAULT_USERNAME}
            </span>
          </div>
        </div>

        {/* Status / Atividade em Tempo Real com Animações de Entrada e Saída Suaves */}
        <div className="discord-activity-box">
          <div className="discord-status-row">
            <span
              className="discord-pulse-indicator"
              style={{ backgroundColor: isListeningSpotify ? '#1ed760' : getStatusColor(discordData?.status) }}
            />
            <span className="discord-status-text">
              {isListeningSpotify ? 'Ouvindo Spotify' : getStatusLabel(discordData?.status)}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {/* Status Customizado (ex: frase ou emoji) */}
            {discordData?.customStatus && (
              <motion.div
                key="custom-status"
                layout
                initial={{ opacity: 0, y: 12, scale: 0.94, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, scale: 0.94, filter: 'blur(6px)' }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                className="discord-custom-status"
              >
                "{discordData.customStatus}"
              </motion.div>
            )}

            {/* Atividades Rich Presence (VS Code, Jogos, Softwares) */}
            {discordData?.activities?.map((act) => (
              <motion.div
                key={act.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.92, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, scale: 0.92, filter: 'blur(8px)', transition: { duration: 0.22 } }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                className="discord-rich-activity"
              >
                {act.largeImage ? (
                  <div className="discord-activity-asset">
                    <img src={act.largeImage} alt={act.name} className="discord-asset-img" />
                    {act.smallImage && (
                      <img src={act.smallImage} alt="badge" className="discord-asset-small" />
                    )}
                  </div>
                ) : (
                  <span className="discord-activity-icon">🎮</span>
                )}
                <div className="discord-activity-details">
                  <span className="discord-activity-title">{act.name}</span>
                  {act.details && <span className="discord-activity-text">{act.details}</span>}
                  {act.state && <span className="discord-activity-subtext">{act.state}</span>}
                </div>
              </motion.div>
            ))}

            {/* Spotify Ouvindo ao Vivo (Clicável com link direto para a música) */}
            {discordData?.spotify && (
              <motion.a
                key={`spotify-${discordData.spotify.trackId || discordData.spotify.song}`}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.92, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -14, scale: 0.92, filter: 'blur(8px)', transition: { duration: 0.22 } }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="discord-spotify-rich discord-spotify-link"
                title={`Ouvir "${discordData.spotify.song}" no Spotify (Abre em nova guia)`}
              >
                {discordData.spotify.albumArtUrl ? (
                  <div className="discord-spotify-art-wrapper">
                    <img src={discordData.spotify.albumArtUrl} alt="Album" className="discord-spotify-art" />
                    <span className="discord-spotify-hover-play" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </span>
                  </div>
                ) : (
                  <span className="discord-activity-icon">🎵</span>
                )}
                <div className="discord-activity-details">
                  <div className="discord-spotify-badge-row">
                    <span className="discord-spotify-badge">
                      <span className="spotify-live-indicator" /> Ouvindo no Spotify
                    </span>
                    <svg className="spotify-music-note-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 18V5l12-2v13"></path>
                      <circle cx="6" cy="18" r="3"></circle>
                      <circle cx="18" cy="16" r="3"></circle>
                    </svg>
                  </div>
                  <span className="discord-activity-title discord-spotify-glowing-title">
                    {discordData.spotify.song}
                  </span>
                  <span className="discord-activity-text">por {discordData.spotify.artist}</span>
                </div>
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        {/* Botão de Ação Rápida */}
        <div className="discord-actions-row">
          <button
            onClick={handleCopyDiscord}
            className={`nav-link discord-copy-btn ${copied ? 'copied' : ''}`}
            title="Copiar nome de usuário do Discord"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {copied ? (
                <polyline points="20 6 9 17 4 12" />
              ) : (
                <>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </>
              )}
            </svg>
            <span>{copied ? 'Tag Copiada!' : 'Copiar Discord'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
