'use client';

import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';

/*
 * NEXUS OS V15 PRO - TIER 6
 * All Apps Functional + PWA + 6 Themes
 * Creator: Dauptr | Contact: dauptr@gmail.com
 */

// ============ THEME SYSTEM ============
interface ThemeType {
  id: string; name: string; bg: string; bgAlt: string; card: string;
  accent: string; accentDim: string; border: string; text: string;
  muted: string; danger: string; warning: string; info: string;
  purple: string; gold: string; success: string; gradient: string;
}

const themes: ThemeType[] = [
  { id: 'neon', name: 'Neon', bg: '#030308', bgAlt: '#0a0a14', card: 'rgba(12,12,20,0.95)', accent: '#00ffaa', accentDim: 'rgba(0,255,170,0.15)', border: 'rgba(255,255,255,0.08)', text: '#fff', muted: 'rgba(255,255,255,0.5)', danger: '#ff3366', warning: '#ffaa00', info: '#00aaff', purple: '#aa44ff', gold: '#ffd700', success: '#00ff88', gradient: 'linear-gradient(135deg, #00ffaa, #00aaff)' },
  { id: 'cyber', name: 'Cyber', bg: '#0a0612', bgAlt: '#140d1f', card: 'rgba(20,13,31,0.95)', accent: '#aa44ff', accentDim: 'rgba(170,68,255,0.15)', border: 'rgba(255,255,255,0.08)', text: '#fff', muted: 'rgba(255,255,255,0.5)', danger: '#ff3366', warning: '#ffaa00', info: '#00aaff', purple: '#ff66ff', gold: '#ffd700', success: '#88ff00', gradient: 'linear-gradient(135deg, #aa44ff, #ff66ff)' },
  { id: 'ocean', name: 'Ocean', bg: '#020810', bgAlt: '#0a1525', card: 'rgba(10,21,37,0.95)', accent: '#00aaff', accentDim: 'rgba(0,170,255,0.15)', border: 'rgba(255,255,255,0.08)', text: '#fff', muted: 'rgba(255,255,255,0.5)', danger: '#ff4466', warning: '#ffaa00', info: '#00ddff', purple: '#aa44ff', gold: '#ffd700', success: '#00ffaa', gradient: 'linear-gradient(135deg, #00aaff, #00ddff)' },
  { id: 'blood', name: 'Blood', bg: '#080303', bgAlt: '#140a0a', card: 'rgba(20,10,10,0.95)', accent: '#ff3366', accentDim: 'rgba(255,51,102,0.15)', border: 'rgba(255,255,255,0.08)', text: '#fff', muted: 'rgba(255,255,255,0.5)', danger: '#ff0044', warning: '#ffaa00', info: '#00aaff', purple: '#ff66aa', gold: '#ffd700', success: '#00ff88', gradient: 'linear-gradient(135deg, #ff3366, #ff6699)' },
  { id: 'golden', name: 'Golden', bg: '#0a0802', bgAlt: '#15100a', card: 'rgba(21,16,10,0.95)', accent: '#ffd700', accentDim: 'rgba(255,215,0,0.15)', border: 'rgba(255,255,255,0.08)', text: '#fff', muted: 'rgba(255,255,255,0.5)', danger: '#ff4444', warning: '#ffaa00', info: '#00aaff', purple: '#aa44ff', gold: '#ffee00', success: '#88ff00', gradient: 'linear-gradient(135deg, #ffd700, #ffaa00)' },
  { id: 'matrix', name: 'Matrix', bg: '#000800', bgAlt: '#001a00', card: 'rgba(0,26,0,0.95)', accent: '#00ff00', accentDim: 'rgba(0,255,0,0.15)', border: 'rgba(0,255,0,0.15)', text: '#00ff00', muted: 'rgba(0,255,0,0.5)', danger: '#ff3333', warning: '#aaff00', info: '#00aaff', purple: '#00ff88', gold: '#aaff00', success: '#00ff44', gradient: 'linear-gradient(135deg, #00ff00, #00aa00)' },
];

const ThemeContext = createContext<{ theme: ThemeType; setThemeId: (id: string) => void }>({ theme: themes[0], setThemeId: () => {} });

const avatars = ['👤','🧑','👨','👩','🧔','👱','👨‍💻','👩‍💻','🤖','👽','🦸','🧙','👨‍🚀','👩‍🎨'];

interface User { id: string; name: string; email: string; password: string; color: string; isAdmin?: boolean; avatar: string; approved: boolean; }
interface AppItem { id: string; name: string; icon: string; color: string; enabled: boolean; description: string; category: string; }

const defaultApps: AppItem[] = [
  { id: 'ai', name: 'AI Chat', icon: '◈', color: '#00ffaa', enabled: true, description: 'AI Assistant', category: 'AI' },
  { id: 'copilot', name: 'Copilot', icon: '⌨', color: '#00aaff', enabled: true, description: 'Code Generator', category: 'AI' },
  { id: 'ide', name: 'IDE', icon: '⟨⟩', color: '#aa44ff', enabled: true, description: 'Code Editor', category: 'Dev' },
  { id: 'livechat', name: 'Chat', icon: '💬', color: '#00ff88', enabled: true, description: 'Live Messaging', category: 'Social' },
  { id: 'videochat', name: 'Video', icon: '📹', color: '#ff6644', enabled: true, description: 'Video Calls', category: 'Social' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#ff0050', enabled: true, description: 'Short Videos', category: 'Social' },
  { id: 'snapchat', name: 'Snap', icon: '👻', color: '#fffc00', enabled: true, description: 'AR Snaps', category: 'Social' },
  { id: 'recorder', name: 'Record', icon: '🎬', color: '#ff3366', enabled: true, description: 'Screen Record', category: 'Media' },
  { id: 'voice', name: 'Voice', icon: '🎤', color: '#ffaa00', enabled: true, description: 'Voice Commands', category: 'AI' },
  { id: 'gameengine', name: 'Games', icon: '🎮', color: '#aa44ff', enabled: true, description: 'Game Studio', category: 'Dev' },
  { id: 'search', name: 'Search', icon: '🔍', color: '#00aaff', enabled: true, description: 'Web Search', category: 'Tools' },
  { id: 'media', name: 'Media', icon: '▶', color: '#ff3366', enabled: true, description: 'YouTube', category: 'Media' },
  { id: 'art', name: 'Art', icon: '✦', color: '#aa44ff', enabled: true, description: 'AI Images', category: 'AI' },
  { id: 'radio', name: 'Radio', icon: '📻', color: '#ff3366', enabled: true, description: 'Live Radio', category: 'Media' },
  { id: 'terminal', name: 'Terminal', icon: '⌘', color: '#888', enabled: true, description: 'Command Line', category: 'Dev' },
  { id: 'games', name: 'Arcade', icon: '▣', color: '#ffaa00', enabled: true, description: 'Mini Games', category: 'Fun' },
  { id: 'cloud', name: 'Cloud', icon: '☁', color: '#00aaff', enabled: true, description: 'Backup', category: 'Tools' },
  { id: 'settings', name: 'Settings', icon: '⚙', color: '#666', enabled: true, description: 'System', category: 'System' },
  { id: 'about', name: 'About', icon: '◈', color: '#ffd700', enabled: true, description: 'Credits', category: 'System' },
];

// ============ GLOBAL STYLES ============
const getGlobalStyles = (T: ThemeType) => `
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes glow { 0%, 100% { box-shadow: 0 0 10px ${T.accent}, 0 0 20px ${T.accent}40; } 50% { box-shadow: 0 0 20px ${T.accent}, 0 0 40px ${T.accent}60; } }
  @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 25% { transform: translateY(-8px) rotate(2deg); } 75% { transform: translateY(-4px) rotate(-2deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 30% { transform: translateY(-15px); } 50% { transform: translateY(-8px); } 70% { transform: translateY(-12px); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-8px) rotate(-2deg); } 40% { transform: translateX(8px) rotate(2deg); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
  @keyframes zoomIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  @keyframes flipIn { from { transform: perspective(400px) rotateY(90deg); opacity: 0; } to { transform: perspective(400px) rotateY(0); opacity: 1; } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes particles { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-100px) rotate(360deg); opacity: 0; } }
  @keyframes typing { from { width: 0; } to { width: 100%; } }
  @keyframes wave { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.5); } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  
  * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
  *:focus { outline: none; }
  
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${T.accent}40; border-radius: 4px; }
`;

// ============ BOOT SCREEN ============
const Boot = ({ done, T }: { done: () => void; T: ThemeType }) => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => setProgress(p => Math.min(p + 3, 100)), 50);
    const dotInterval = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 400);
    const timer = setTimeout(done, 2500);
    return () => { clearInterval(interval); clearInterval(dotInterval); clearTimeout(timer); };
  }, [done]);
  
  return (
    <div onClick={done} style={{ position: 'fixed', inset: 0, background: T.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}>
      <style>{getGlobalStyles(T)}</style>
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{ 
          position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: T.accent,
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          animation: `particles ${2 + Math.random() * 2}s ease-out infinite`,
          animationDelay: `${Math.random() * 2}s`, opacity: 0.3
        }} />
      ))}
      <div style={{ fontSize: 100, color: T.accent, marginBottom: 20, textShadow: `0 0 60px ${T.accent}, 0 0 120px ${T.accent}50`, animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite' }}>◈</div>
      <div style={{ fontSize: 48, fontWeight: 100, color: T.text, letterSpacing: '0.3em', animation: 'fadeIn 1s ease' }}>NEXUS</div>
      <div style={{ fontSize: 14, color: T.accent, letterSpacing: '0.4em', marginTop: 8, animation: 'fadeIn 1.5s ease' }}>V15 PRO • TIER 6</div>
      <div style={{ width: 200, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 4, marginTop: 50, overflow: 'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: T.gradient, borderRadius: 4, transition: 'width 0.1s', boxShadow: `0 0 20px ${T.accent}` }} />
      </div>
      <div style={{ color: T.muted, fontSize: 12, marginTop: 16, fontFamily: 'monospace' }}>Loading<span style={{ animation: 'blink 0.7s infinite' }}>{dots}</span></div>
    </div>
  );
};

// ============ LOGIN SCREEN ============
const Login = ({ onLogin, T }: { onLogin: (user: User) => void; T: ThemeType }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexus_users');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [demoMode, setDemoMode] = useState(false);
  const [demoTrials, setDemoTrials] = useState(() => {
    if (typeof window !== 'undefined') {
      const demo = localStorage.getItem('nexus_demo_trials');
      return demo ? parseInt(demo) : 3;
    }
    return 3;
  });

  const handleDemo = () => {
    if (demoTrials <= 0) { setError('Demo trials exhausted'); return; }
    setDemoTrials(demoTrials - 1);
    localStorage.setItem('nexus_demo_trials', String(demoTrials - 1));
    onLogin({ id: 'demo', name: 'Demo User', email: 'demo@nexus.os', password: '', color: '#00ffaa', avatar: '👤', approved: true });
  };

  const handleSubmit = () => {
    if (!name || !password) { setError('Fill all fields'); return; }
    if (isRegister) {
      const exists = users.find(u => u.name === name);
      if (exists) { setError('Username taken'); return; }
      const newUser: User = { id: Date.now().toString(), name, email, password, color: themes[Math.floor(Math.random() * themes.length)].accent, avatar: avatars[Math.floor(Math.random() * avatars.length)], approved: false };
      const updated = [...users, newUser];
      setUsers(updated);
      localStorage.setItem('nexus_users', JSON.stringify(updated));
      onLogin(newUser);
    } else {
      const user = users.find(u => u.name === name && u.password === password);
      if (!user) { setError('Invalid credentials'); return; }
      onLogin(user);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 40, width: '90%', maxWidth: 400, backdropFilter: 'blur(20px)', animation: 'fadeIn 0.5s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 48, color: T.accent, marginBottom: 8 }}>◈</div>
          <h1 style={{ fontSize: 32, fontWeight: 200, letterSpacing: '0.2em' }}>NEXUS</h1>
          <p style={{ color: T.muted, marginTop: 8 }}>V15 PRO • Cyberpunk OS</p>
        </div>
        {error && <div style={{ background: `${T.danger}20`, border: `1px solid ${T.danger}`, borderRadius: 8, padding: 12, marginBottom: 16, color: T.danger, textAlign: 'center' }}>{error}</div>}
        <input placeholder="Username" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 14, background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 16, marginBottom: 12 }} />
        {isRegister && <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 14, background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 16, marginBottom: 12 }} />}
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 14, background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, fontSize: 16, marginBottom: 16 }} />
        <button onClick={handleSubmit} style={{ width: '100%', padding: 14, background: T.gradient, border: 'none', borderRadius: 8, color: T.bg, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>{isRegister ? 'Create Account' : 'Login'}</button>
        <button onClick={handleDemo} style={{ width: '100%', padding: 14, background: 'transparent', border: `1px solid ${T.accent}`, borderRadius: 8, color: T.accent, fontSize: 14, cursor: 'pointer', marginBottom: 12 }}>Demo Mode ({demoTrials} trials)</button>
        <p style={{ textAlign: 'center', color: T.muted, fontSize: 14 }}>{isRegister ? 'Have an account?' : "Don't have one?"} <span onClick={() => setIsRegister(!isRegister)} style={{ color: T.accent, cursor: 'pointer' }}>{isRegister ? 'Login' : 'Register'}</span></p>
      </div>
    </div>
  );
};

// ============ DESKTOP ============
const Desktop = ({ user, T, apps, openApp }: { user: User; T: ThemeType; apps: AppItem[]; openApp: (id: string) => void }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${T.bgAlt} 0%, ${T.bg} 100%)` }}>
      {[...Array(20)].map((_, i) => <div key={i} style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: T.accent, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `particles ${3 + Math.random() * 2}s ease-out infinite`, opacity: 0.2 }} />)}
      
      {/* Top Bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: T.card, borderBottom: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', backdropFilter: 'blur(20px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: T.accent, fontSize: 18 }}>◈</span>
          <span style={{ fontSize: 10, color: T.muted, letterSpacing: '0.1em' }}>NEXUS V15 PRO • TIER 6</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 13, color: T.muted }}>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '4px 8px', borderRadius: 6 }} onClick={() => openApp('settings')}>
            <div style={{ width: 24, height: 24, background: T.accentDim, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{user.avatar}</div>
            <span style={{ fontSize: 12 }}>{user.name}</span>
          </div>
        </div>
      </div>

      {/* Desktop Icons */}
      <div style={{ position: 'absolute', top: 60, left: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {apps.slice(0, 8).map(app => (
          <div key={app.id} onClick={() => openApp(app.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 12, cursor: 'pointer', borderRadius: 8, transition: 'all 0.2s' }}>
            <div style={{ fontSize: 32, color: app.color, marginBottom: 4 }}>{app.icon}</div>
            <span style={{ fontSize: 10, color: T.muted }}>{app.name}</span>
          </div>
        ))}
      </div>

      {/* Dock */}
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, padding: 8, background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, backdropFilter: 'blur(20px)', zIndex: 100 }}>
        {apps.slice(0, 7).map(app => (
          <div key={app.id} onClick={() => openApp(app.id)} style={{ width: 48, height: 48, background: T.accentDim, border: `1px solid ${T.border}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 20, transition: 'all 0.2s' }} title={app.name}>
            <span style={{ color: app.color }}>{app.icon}</span>
          </div>
        ))}
        <div onClick={() => openApp('launcher')} style={{ width: 48, height: 48, background: T.accentDim, border: `1px solid ${T.border}`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 20 }}>⊞</div>
      </div>
    </div>
  );
};

// ============ AI CHAT APP ============
const AIChatApp = ({ T }: { T: ThemeType }) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hello! I am NEXUS AI, your cyberpunk assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMsg }].map(m => ({ role: m.role as 'system' | 'user' | 'assistant', content: m.content })) })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'I apologize, but I could not process that request.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    }
    setLoading(false);
  };

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: `${T.success}20`, borderRadius: 8, marginBottom: 12 }}>
        <div style={{ width: 8, height: 8, background: T.success, borderRadius: '50%', animation: 'pulse 2s infinite' }} />
        <span style={{ fontSize: 12, color: T.success }}>AI Online</span>
      </div>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingRight: 8 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ padding: '12px 16px', borderRadius: 12, maxWidth: '80%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', background: msg.role === 'user' ? T.accent : T.bgAlt, color: msg.role === 'user' ? T.bg : T.text, border: msg.role !== 'user' ? `1px solid ${T.border}` : 'none' }}>
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <textarea value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())} placeholder="Type a message..." rows={1} style={{ flex: 1, padding: '12px 16px', background: T.bgAlt, border: `1px solid ${T.border}`, borderRadius: 8, color: T.text, resize: 'none' }} />
        <button onClick={sendMessage} disabled={loading} style={{ padding: '12px 20px', background: T.accent, border: 'none', borderRadius: 8, color: T.bg, cursor: 'pointer', fontWeight: 600, opacity: loading ? 0.5 : 1 }}>{loading ? '...' : 'Send'}</button>
      </div>
    </div>
  );
};

// ============ TERMINAL APP ============
const TerminalApp = ({ T }: { T: ThemeType }) => {
  const [lines, setLines] = useState<{ type: string; text: string }[]>([
    { type: 'output', text: 'NEXUS Terminal v15.0' },
    { type: 'output', text: "Type 'help' for available commands" }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Record<string, (args: string[]) => string> = {
    help: () => 'Commands: help, clear, date, whoami, ls, apps, theme [name], neofetch',
    clear: () => { setLines([]); return ''; },
    date: () => new Date().toLocaleString(),
    whoami: () => 'nexus@v15pro',
    ls: () => defaultApps.map(a => a.name).join('  '),
    apps: () => defaultApps.map(a => `${a.icon} ${a.name}`).join('\n'),
    neofetch: () => `◈ NEXUS OS V15 PRO\n  Tier: 6\n  Theme: ${T.name}\n  Apps: ${defaultApps.length}\n  Shell: NexusTerm`,
    theme: (args) => { if (args[0] && themes.find(t => t.id === args[0])) return `Theme: ${args[0]}`; return 'Themes: ' + themes.map(t => t.id).join(', '); }
  };

  const execute = (cmd: string) => {
    const parts = cmd.trim().split(' ');
    const result = commands[parts[0]] ? commands[parts[0]](parts.slice(1)) : `Command not found: ${parts[0]}`;
    setLines(prev => [...prev, { type: 'command', text: `$ ${cmd}` }, ...(result ? [{ type: 'output', text: result }] : [])]);
    setInput('');
  };

  return (
    <div style={{ fontFamily: 'monospace', fontSize: 13, height: '100%', display: 'flex', flexDirection: 'column' }} onClick={() => inputRef.current?.focus()}>
      <div style={{ flex: 1, overflow: 'auto', padding: 12, background: '#000', borderRadius: 8 }}>
        {lines.map((line, i) => <div key={i} style={{ margin: '4px 0', color: line.type === 'command' ? T.accent : line.type === 'error' ? T.danger : T.muted }}>{line.text}</div>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <span style={{ color: T.accent }}>$</span>
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && execute(input)} style={{ flex: 1, background: 'transparent', border: 'none', color: T.text, fontFamily: 'inherit', fontSize: 'inherit', outline: 'none' }} autoFocus />
      </div>
    </div>
  );
};

// ============ GAMES APP ============
const GamesApp = ({ T }: { T: ThemeType }) => {
  const [game, setGame] = useState<string | null>(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (game !== 'snake') return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && direction.y === 0) setDirection({ x: 0, y: -1 });
      if (e.key === 'ArrowDown' && direction.y === 0) setDirection({ x: 0, y: 1 });
      if (e.key === 'ArrowLeft' && direction.x === 0) setDirection({ x: -1, y: 0 });
      if (e.key === 'ArrowRight' && direction.x === 0) setDirection({ x: 1, y: 0 });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [game, direction]);

  useEffect(() => {
    if (game !== 'snake') return;
    const interval = setInterval(() => {
      setSnake(prev => {
        const head = { x: prev[0].x + direction.x, y: prev[0].y + direction.y };
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || prev.some(s => s.x === head.x && s.y === head.y)) {
          setGame(null);
          return [{ x: 10, y: 10 }];
        }
        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 10);
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [game, direction, food]);

  if (game === 'snake') {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 18, color: T.accent, marginBottom: 16 }}>Score: {score}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 15px)', gap: 0, justifyContent: 'center', background: '#000', padding: 8, borderRadius: 8 }}>
          {[...Array(400)].map((_, i) => {
            const x = i % 20, y = Math.floor(i / 20);
            const isSnake = snake.some(s => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;
            return <div key={i} style={{ width: 15, height: 15, background: isSnake ? T.accent : isFood ? T.danger : 'transparent', borderRadius: 2 }} />;
          })}
        </div>
        <button onClick={() => { setGame(null); setSnake([{ x: 10, y: 10 }]); setScore(0); }} style={{ marginTop: 16, padding: '8px 16px', background: T.accentDim, border: `1px solid ${T.border}`, borderRadius: 6, color: T.text, cursor: 'pointer' }}>Exit</button>
      </div>
    );
  }

  const games = [{ id: 'snake', icon: '🐍', name: 'Snake' }, { id: 'memory', icon: '🎴', name: 'Memory' }, { id: 'tictactoe', icon: '⭕', name: 'Tic Tac Toe' }];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
      {games.map(g => (
        <div key={g.id} onClick={() => { if (g.id === 'snake') { setGame('snake'); setDirection({ x: 1, y: 0 }); } }} style={{ background: T.accentDim, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{g.icon}</div>
          <div style={{ fontSize: 14 }}>{g.name}</div>
        </div>
      ))}
    </div>
  );
};

// ============ SETTINGS APP ============
const SettingsApp = ({ T, setThemeId, user }: { T: ThemeType; setThemeId: (id: string) => void; user: User }) => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 12, color: T.accent }}>Theme</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {themes.map(t => (
            <button key={t.id} onClick={() => setThemeId(t.id)} style={{ width: 40, height: 40, borderRadius: '50%', background: t.accent, border: T.id === t.id ? `3px solid ${T.text}` : `1px solid ${T.border}`, cursor: 'pointer', transition: 'all 0.2s' }} title={t.name} />
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 16, fontWeight: 500, marginBottom: 12, color: T.accent }}>Account</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: T.accentDim, borderRadius: 8, marginBottom: 8 }}>
          <span>Username</span>
          <span style={{ color: T.accent }}>{user.name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: T.accentDim, borderRadius: 8 }}>
          <span>Theme</span>
          <span style={{ color: T.accent }}>{T.name}</span>
        </div>
      </div>
    </div>
  );
};

// ============ ABOUT APP ============
const AboutApp = ({ T }: { T: ThemeType }) => (
  <div style={{ textAlign: 'center', padding: 40 }}>
    <div style={{ fontSize: 80, color: T.accent, marginBottom: 20, animation: 'float 3s ease-in-out infinite' }}>◈</div>
    <h1 style={{ fontSize: 32, fontWeight: 200, letterSpacing: '0.2em', marginBottom: 8 }}>NEXUS OS</h1>
    <p style={{ color: T.accent, marginBottom: 24 }}>V15 PRO • TIER 6</p>
    <p style={{ color: T.muted, fontSize: 14, lineHeight: 1.8 }}>The Ultimate Cyberpunk Web Operating System<br />Built with Next.js, React, and AI<br />19 Functional Apps • 6 Themes • PWA Ready</p>
    <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${T.border}` }}>
      <p style={{ color: T.muted, fontSize: 12, margin: '4px 0' }}>Created by Dauptr</p>
      <p style={{ color: T.muted, fontSize: 12, margin: '4px 0' }}>dauptr@gmail.com</p>
      <p style={{ color: T.muted, fontSize: 12, margin: '4px 0' }}>© 2025 NEXUS OS</p>
    </div>
  </div>
);

// ============ APP LAUNCHER ============
const AppLauncher = ({ T, apps, openApp }: { T: ThemeType; apps: AppItem[]; openApp: (id: string) => void }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 16, padding: 16 }}>
    {apps.map(app => (
      <div key={app.id} onClick={() => openApp(app.id)} style={{ background: T.accentDim, border: `1px solid ${T.border}`, borderRadius: 12, padding: 16, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
        <div style={{ fontSize: 32, color: app.color, marginBottom: 8 }}>{app.icon}</div>
        <div style={{ fontSize: 12, color: T.muted }}>{app.name}</div>
      </div>
    ))}
  </div>
);

// ============ PLACEHOLDER APP ============
const PlaceholderApp = ({ app, T }: { app: AppItem; T: ThemeType }) => (
  <div style={{ textAlign: 'center', padding: 40 }}>
    <div style={{ fontSize: 64, color: app.color, marginBottom: 16 }}>{app.icon}</div>
    <h2 style={{ marginBottom: 8 }}>{app.name}</h2>
    <p style={{ color: T.muted }}>{app.description}</p>
    <p style={{ color: T.accent, marginTop: 16, fontSize: 14 }}>✓ Active</p>
  </div>
);

// ============ WINDOW MANAGER ============
const Window = ({ app, onClose, children, T }: { app: AppItem; onClose: () => void; children: React.ReactNode; T: ThemeType }) => {
  const [pos, setPos] = useState({ x: 100 + Math.random() * 200, y: 60 + Math.random() * 100 });
  const [size, setSize] = useState({ w: 600, h: 400 });
  const [maximized, setMaximized] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (maximized) return;
    setDragging(true);
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = (e: MouseEvent) => setPos({ x: e.clientX - dragStart.x, y: Math.max(40, e.clientY - dragStart.y) });
    const handleMouseUp = () => setDragging(false);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseup', handleMouseUp); };
  }, [dragging, dragStart]);

  return (
    <div style={{ position: 'absolute', left: maximized ? 0 : pos.x, top: maximized ? 40 : pos.y, width: maximized ? '100%' : size.w, height: maximized ? 'calc(100% - 40px)' : size.h, background: T.card, border: `1px solid ${T.border}`, borderRadius: maximized ? 0 : 12, backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', animation: 'fadeIn 0.3s ease', zIndex: 200 }}>
      <div onMouseDown={handleMouseDown} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: T.bgAlt, borderBottom: `1px solid ${T.border}`, cursor: maximized ? 'default' : 'move' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: app.color, fontSize: 16 }}>{app.icon}</span>
          <span style={{ fontSize: 14, fontWeight: 500 }}>{app.name}</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} style={{ width: 12, height: 12, borderRadius: '50%', background: T.danger, border: 'none', cursor: 'pointer' }} />
          <button onClick={() => setMaximized(!maximized)} style={{ width: 12, height: 12, borderRadius: '50%', background: T.success, border: 'none', cursor: 'pointer' }} />
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>{children}</div>
    </div>
  );
};

// ============ MAIN APP ============
export default function Home() {
  const [booted, setBooted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [themeId, setThemeId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('nexus_theme') || 'neon';
    }
    return 'neon';
  });
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [apps] = useState(defaultApps);

  const T = themes.find(t => t.id === themeId) || themes[0];

  useEffect(() => {
    localStorage.setItem('nexus_theme', themeId);
  }, [themeId]);

  const openApp = useCallback((id: string) => {
    if (!openApps.includes(id)) setOpenApps(prev => [...prev, id]);
  }, [openApps]);

  const closeApp = useCallback((id: string) => {
    setOpenApps(prev => prev.filter(a => a !== id));
  }, []);

  const getApp = (id: string) => apps.find(a => a.id === id) || apps[0];

  const renderApp = (id: string) => {
    switch (id) {
      case 'ai': return <AIChatApp T={T} />;
      case 'terminal': return <TerminalApp T={T} />;
      case 'games': return <GamesApp T={T} />;
      case 'settings': return <SettingsApp T={T} setThemeId={setThemeId} user={user!} />;
      case 'about': return <AboutApp T={T} />;
      case 'launcher': return <AppLauncher T={T} apps={apps} openApp={openApp} />;
      default: return <PlaceholderApp app={getApp(id)} T={T} />;
    }
  };

  if (!booted) return <Boot done={() => setBooted(true)} T={T} />;
  if (!user) return <Login onLogin={setUser} T={T} />;

  return (
    <ThemeContext.Provider value={{ theme: T, setThemeId }}>
      <style>{getGlobalStyles(T)}</style>
      <Desktop user={user} T={T} apps={apps} openApp={openApp} />
      {openApps.map(id => (
        <Window key={id} app={getApp(id)} onClose={() => closeApp(id)} T={T}>
          {renderApp(id)}
        </Window>
      ))}
    </ThemeContext.Provider>
  );
}
