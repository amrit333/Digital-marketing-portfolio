import React, { useState, useEffect, useRef } from 'react';

const PRESET_TRIGGERS = [
  { keyword: 'GROWTH', desc: 'Get Organic Strategy Guide' },
  { keyword: 'AUTOMATE', desc: 'Instagram ManyChat Audit' },
  { keyword: 'STITCH', desc: 'Stitchery by Preet Demo Flow' }
];

export default function ManyChatSimulator() {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { username: 'digital_marketer', text: 'Stunning organic growth stats! 🔥', time: '2h' },
    { username: 'creative_agency', text: 'The automation flows look super clean.', time: '1h' }
  ]);
  const [activeTab, setActiveTab] = useState('post'); // 'post' or 'inbox'
  const [inboxMessages, setInboxMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [automationActive, setAutomationActive] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [inboxMessages, isTyping]);

  const triggerManyChatFlow = (keyword) => {
    setAutomationActive(true);
    // 1. Add to comments list
    const newComment = {
      username: 'you_visitor',
      text: keyword,
      time: 'Just now'
    };
    setComments(prev => [...prev, newComment]);
    setCommentText('');

    // 2. Switch to inbox after brief delay
    setTimeout(() => {
      setActiveTab('inbox');
      setInboxMessages([
        {
          id: 1,
          sender: 'system',
          text: `⚡ ManyChat trigger detected: "${keyword}"`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      
      // Start bot response sequence
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        const welcomeMsg = {
          id: 2,
          sender: 'amrit_bot',
          text: `Hey there! 👋 Thanks for commenting "${keyword}" on my portfolio post. I'm Amrit's automation assistant.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        let flowPayload = [];
        if (keyword.toUpperCase() === 'GROWTH') {
          flowPayload = [
            {
              id: 3,
              sender: 'amrit_bot',
              text: 'Here is your link to the Organic Instagram Strategy Guide (₹0 ad spend, 150+ lead funnel template)! 👇',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              buttons: [
                { text: '📖 Get Strategy Guide', action: 'guide' },
                { text: '📅 Book 15m Strategy Call', action: 'call' }
              ]
            }
          ];
        } else if (keyword.toUpperCase() === 'AUTOMATE') {
          flowPayload = [
            {
              id: 3,
              sender: 'amrit_bot',
              text: 'Let\'s set up your ManyChat audit. What is your primary business goal on social media?',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              buttons: [
                { text: '🎯 More Leads / Inquiries', action: 'leads' },
                { text: '🛍️ E-commerce Sales', action: 'sales' }
              ]
            }
          ];
        } else {
          flowPayload = [
            {
              id: 3,
              sender: 'amrit_bot',
              text: 'Stitchery by Preet Flow Demo: Here is how I routed handcrafted clothing inquiries to dynamic menus, reducing response time by 95%!',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              buttons: [
                { text: '👗 View Catalog Flow', action: 'catalog' },
                { text: '💬 Main Menu', action: 'menu' }
              ]
            }
          ];
        }

        setInboxMessages(prev => [...prev, welcomeMsg]);
        
        // Show second message typing bubble
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setInboxMessages(prev => [...prev, ...flowPayload]);
          }, 1000);
        }, 1200);

      }, 1500);

    }, 800);
  };

  const handleButtonSubmit = (action) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let responseText = '';
      if (action === 'guide') {
        responseText = 'Awesome choice! Redirecting to the Strategy Guide... In a production setup, this would trigger an instant PDF deliverable directly in your DMs or an email opt-in sequence! 📊';
      } else if (action === 'call') {
        responseText = 'Great! Calendar integration active. In production, this links to Calendly / Meta Scheduler. Let\'s get your page growing! 🚀';
      } else if (action === 'leads' || action === 'sales') {
        responseText = 'Perfect! Based on your choice, I have recorded your goal. This automatically tags you in ManyChat to customize future sequences and launch targeted DM campaigns! 🛠️';
      } else {
        responseText = 'Triggering catalog lookup... Instant image carousel generated and sizing guide sent. 24/7 client onboarding complete with zero manual steps! 👗✨';
      }
      
      setInboxMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'amrit_bot',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <div style={styles.simulatorWrapper}>
      {/* Sidebar explanation */}
      <div style={styles.infoColumn}>
        <div style={styles.badgeContainer}>
          <span style={styles.badge}><i className="fa-solid fa-bolt" style={{ marginRight: '6px' }}></i> LIVE INTERACTION</span>
        </div>
        <h3 style={styles.sideTitle}>ManyChat Lead Capture Simulator</h3>
        <p style={styles.sideDesc}>
          Experience first-hand how my Instagram comment automation turns casual viewers into qualified warm leads automatically.
        </p>
        
        <div style={styles.stepIndicator}>
          <div style={styles.stepLine}>
            <div style={styles.stepNumActive}>1</div>
            <p style={styles.stepText}>Choose a keyword trigger below or type one in.</p>
          </div>
          <div style={styles.stepLine}>
            <div style={styles.stepNumActive}>2</div>
            <p style={styles.stepText}>The automation detects the comment instantly.</p>
          </div>
          <div style={styles.stepLine}>
            <div style={styles.stepNumActive}>3</div>
            <p style={styles.stepText}>ManyChat shoots a customized DM funnel sequence in the inbox.</p>
          </div>
        </div>

        <div style={styles.presetsGrid}>
          <p style={styles.presetLabel}>Click a preset trigger to start:</p>
          {PRESET_TRIGGERS.map(pt => (
            <button
              key={pt.keyword}
              onClick={() => triggerManyChatFlow(pt.keyword)}
              style={styles.presetBtn}
              className="glass-card"
            >
              <span style={styles.keyword}>"{pt.keyword}"</span>
              <span style={styles.ptDesc}>{pt.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Phone container */}
      <div style={styles.phoneWrapper}>
        <div style={styles.phoneShell}>
          {/* Speaker / Notch */}
          <div style={styles.phoneNotch}>
            <span style={styles.notchCam} />
            <span style={styles.notchSpeaker} />
          </div>

          {/* App Header */}
          <div style={styles.appHeader}>
            <div style={styles.appHeaderLeft}>
              <i className="fa-solid fa-chevron-left" style={{ fontSize: '16px', cursor: 'pointer' }} onClick={() => setActiveTab('post')}></i>
              {activeTab === 'inbox' ? (
                <div style={styles.headerProfile}>
                  <div style={styles.tinyAvatar}>A</div>
                  <div>
                    <p style={styles.profileName}>amrit.automation</p>
                    <p style={styles.profileSub}>Active now</p>
                  </div>
                </div>
              ) : (
                <span style={styles.appTitle}>Instagram</span>
              )}
            </div>
            <div style={styles.appHeaderRight}>
              <i className="fa-regular fa-paper-plane" style={{ fontSize: '18px', cursor: 'pointer', color: activeTab === 'inbox' ? 'var(--accent-blue)' : '#fff' }} onClick={() => setActiveTab(activeTab === 'post' ? 'inbox' : 'post')}></i>
            </div>
          </div>

          {/* Screen Content */}
          <div style={styles.appBody}>
            {activeTab === 'post' ? (
              <div style={styles.postView}>
                {/* Post User info */}
                <div style={styles.postUserRow}>
                  <div style={styles.avatar}>A</div>
                  <span style={styles.postUsername}>amrit.automation</span>
                  <i className="fa-solid fa-ellipsis" style={{ marginLeft: 'auto', opacity: 0.6 }}></i>
                </div>

                {/* Post Image/Visual */}
                <div style={styles.postMedia}>
                  <div style={styles.mediaOverlay}>
                    <p style={styles.mediaTitle}>ORGANIC FUNNEL</p>
                    <p style={styles.mediaSubtitle}>ManyChat + AI Strategy</p>
                    <span style={styles.mediaBadge}>₹0 Ad Spend</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div style={styles.postActions}>
                  <i className="fa-regular fa-heart" style={{ fontSize: '20px' }}></i>
                  <i className="fa-regular fa-comment" style={{ fontSize: '20px' }}></i>
                  <i className="fa-regular fa-paper-plane" style={{ fontSize: '20px' }}></i>
                  <i className="fa-regular fa-bookmark" style={{ marginLeft: 'auto', fontSize: '20px' }}></i>
                </div>

                {/* Comments Section */}
                <div style={styles.commentsList}>
                  {comments.map((c, i) => (
                    <div key={i} style={styles.commentItem}>
                      <span style={styles.commentUser}>{c.username}</span>
                      <span style={styles.commentText}>{c.text}</span>
                      <span style={styles.commentTime}>{c.time}</span>
                    </div>
                  ))}
                </div>

                {/* Input box */}
                <div style={styles.commentInputRow}>
                  <input
                    type="text"
                    placeholder="Comment GROWTH or AUTOMATE..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={styles.commentInput}
                    onKeyDown={(e) => e.key === 'Enter' && commentText && triggerManyChatFlow(commentText)}
                  />
                  <button
                    onClick={() => commentText && triggerManyChatFlow(commentText)}
                    style={styles.postCommentBtn}
                  >
                    Post
                  </button>
                </div>
              </div>
            ) : (
              <div style={styles.inboxView}>
                <div style={styles.messageList}>
                  {inboxMessages.length === 0 && (
                    <div style={styles.emptyInbox}>
                      <i className="fa-regular fa-comments" style={{ fontSize: '40px', color: '#ffffff20', marginBottom: '12px' }}></i>
                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>No active automation flow yet.</p>
                      <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Go to the post or click a preset trigger!</p>
                    </div>
                  )}

                  {inboxMessages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        ...styles.messageContainer,
                        justifyContent: msg.sender === 'system' ? 'center' : msg.sender === 'amrit_bot' ? 'flex-start' : 'flex-end'
                      }}
                    >
                      {msg.sender === 'system' ? (
                        <div style={styles.systemMessage}>{msg.text}</div>
                      ) : (
                        <div style={styles.msgBubbleWrapper}>
                          <div
                            style={{
                              ...styles.msgBubble,
                              background: msg.sender === 'amrit_bot' ? '#25293d' : 'var(--accent-blue)',
                              borderRadius: msg.sender === 'amrit_bot' ? '4px 16px 16px 16px' : '16px 16px 4px 16px'
                            }}
                          >
                            <p style={styles.msgText}>{msg.text}</p>
                            
                            {/* Render ManyChat dynamic buttons */}
                            {msg.buttons && (
                              <div style={styles.msgButtonsContainer}>
                                {msg.buttons.map((btn, bidx) => (
                                  <button
                                    key={bidx}
                                    onClick={() => handleButtonSubmit(btn.action)}
                                    style={styles.msgBtn}
                                  >
                                    {btn.text}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <span style={styles.msgTime}>{msg.timestamp}</span>
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div style={{ ...styles.messageContainer, justifyContent: 'flex-start' }}>
                      <div style={{ ...styles.msgBubble, background: '#25293d', padding: '10px 16px' }}>
                        <div style={styles.typingIndicator}>
                          <span style={styles.typingDot}></span>
                          <span style={styles.typingDot}></span>
                          <span style={styles.typingDot}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  simulatorWrapper: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '40px',
    alignItems: 'center',
    width: '100%',
  },
  infoColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  badgeContainer: {
    marginBottom: '16px'
  },
  badge: {
    background: 'rgba(0, 132, 255, 0.15)',
    color: 'var(--accent-blue)',
    fontSize: '12px',
    fontWeight: '700',
    padding: '6px 14px',
    borderRadius: '30px',
    letterSpacing: '0.05em'
  },
  sideTitle: {
    fontSize: '36px',
    lineHeight: '1.2',
    marginBottom: '20px'
  },
  sideDesc: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    marginBottom: '32px',
    lineHeight: '1.5'
  },
  stepIndicator: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '40px'
  },
  stepLine: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  stepNumActive: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'var(--accent-blue)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: '700'
  },
  stepText: {
    fontSize: '14px',
    color: 'var(--text-primary)',
    fontWeight: '500'
  },
  presetsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '100%'
  },
  presetLabel: {
    fontSize: '13px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: '600'
  },
  presetBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 20px',
    cursor: 'pointer',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    textAlign: 'left',
    transition: 'all 0.3s ease',
    width: '100%'
  },
  keyword: {
    fontWeight: '700',
    color: 'var(--accent-blue)',
    fontSize: '15px'
  },
  ptDesc: {
    fontSize: '13px',
    color: 'var(--text-secondary)'
  },
  phoneWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  phoneShell: {
    width: '320px',
    height: '560px',
    background: '#090a0f',
    border: '8px solid #252836',
    borderRadius: '40px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 132, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column'
  },
  phoneNotch: {
    height: '24px',
    width: '140px',
    background: '#252836',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    borderRadius: '0 0 16px 16px',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
  },
  notchCam: {
    width: '6px',
    height: '6px',
    background: '#10121a',
    borderRadius: '50%'
  },
  notchSpeaker: {
    width: '40px',
    height: '4px',
    background: '#10121a',
    borderRadius: '2px'
  },
  appHeader: {
    height: '54px',
    padding: '24px 16px 8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    background: '#090a0f',
    zIndex: 5
  },
  appHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  appHeaderRight: {
    display: 'flex',
    alignItems: 'center'
  },
  appTitle: {
    fontFamily: 'sans-serif',
    fontSize: '17px',
    fontWeight: '700',
    letterSpacing: '-0.03em'
  },
  headerProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  tinyAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold'
  },
  profileName: {
    fontSize: '11px',
    fontWeight: '600',
    lineHeight: '1.2'
  },
  profileSub: {
    fontSize: '9px',
    color: 'var(--accent-green)',
    lineHeight: '1.1'
  },
  appBody: {
    flex: 1,
    overflowY: 'auto',
    background: '#040508',
    position: 'relative'
  },
  postView: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  postUserRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    gap: '8px'
  },
  avatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: 'bold'
  },
  postUsername: {
    fontSize: '12px',
    fontWeight: '600'
  },
  postMedia: {
    height: '190px',
    background: 'linear-gradient(135deg, #151a2d 0%, #0d0f18 100%)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBlock: '1px solid rgba(255, 255, 255, 0.05)'
  },
  mediaOverlay: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  mediaTitle: {
    fontSize: '20px',
    fontWeight: '900',
    letterSpacing: '0.05em',
    color: '#fff',
    fontFamily: 'var(--font-heading)'
  },
  mediaSubtitle: {
    fontSize: '12px',
    color: 'var(--text-secondary)'
  },
  mediaBadge: {
    marginTop: '10px',
    background: '#00e676',
    color: '#000',
    fontSize: '10px',
    fontWeight: '700',
    padding: '3px 8px',
    borderRadius: '4px'
  },
  postActions: {
    display: 'flex',
    padding: '10px 12px',
    gap: '14px',
    opacity: 0.8
  },
  commentsList: {
    padding: '0 12px 10px',
    flex: 1,
    overflowY: 'auto'
  },
  commentItem: {
    fontSize: '11px',
    lineHeight: '1.4',
    marginBottom: '6px'
  },
  commentUser: {
    fontWeight: '700',
    marginRight: '6px'
  },
  commentText: {
    color: 'var(--text-primary)'
  },
  commentTime: {
    color: 'var(--text-muted)',
    fontSize: '9px',
    marginLeft: '6px'
  },
  commentInputRow: {
    display: 'flex',
    padding: '8px 12px',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    background: '#090a0f',
    alignItems: 'center'
  },
  commentInput: {
    flex: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#fff',
    fontSize: '12px'
  },
  postCommentBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--accent-blue)',
    fontWeight: '600',
    fontSize: '12px',
    cursor: 'pointer'
  },
  inboxView: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '14px'
  },
  messageList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    flex: 1,
    overflowY: 'auto'
  },
  emptyInbox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    padding: '0 20px'
  },
  messageContainer: {
    display: 'flex',
    width: '100%'
  },
  systemMessage: {
    background: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    color: 'var(--text-secondary)',
    fontSize: '10px',
    padding: '4px 10px',
    borderRadius: '6px',
    fontFamily: 'monospace'
  },
  msgBubbleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '85%',
    gap: '4px'
  },
  msgBubble: {
    padding: '12px 14px',
    color: '#fff',
    fontSize: '12px',
    lineHeight: '1.4',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  msgText: {
    wordBreak: 'break-word'
  },
  msgTime: {
    fontSize: '8px',
    color: 'var(--text-muted)',
    alignSelf: 'flex-end'
  },
  msgButtonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '10px'
  },
  msgBtn: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '11px',
    fontWeight: '600',
    padding: '8px 10px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'all 0.2s ease',
    width: '100%',
    outline: 'none'
  },
  typingIndicator: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    height: '12px'
  },
  typingDot: {
    width: '6px',
    height: '6px',
    background: '#888',
    borderRadius: '50%',
    animation: 'typing-pulse 1s infinite alternate'
  }
};
