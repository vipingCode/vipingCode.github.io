import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface TerminalSectionProps {
  onOpenCLIModal?: () => void;
}

export const TerminalSection: React.FC<TerminalSectionProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    const subject = encodeURIComponent(`Contact Form Submission from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:vipingupta.fin@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.location.href = mailtoUrl;
    }, 800);
  };

  return (
    <section id="contact" className="py-16 sm:py-28 px-4 sm:px-8 md:px-16 border-t border-[var(--subtle-border)]">
      <div className="max-w-2xl mx-auto">
        
        {/* Contact Form Container */}
        <div className="relative p-6 sm:p-10 md:p-12 theme-card rounded-2xl sm:rounded-3xl border border-[var(--card-border)] shadow-2xl overflow-hidden">
          <div className="ascii-background absolute inset-0 pointer-events-none opacity-10" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter font-mono-tech">
                INITIATE_COMMUNICATION
              </h2>
              <p className="font-mono-tech text-xs opacity-60 mt-2 font-bold tracking-widest uppercase">
                DESTINATION: vipingupta.fin@gmail.com
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[var(--badge-bg)] border border-[var(--card-border)] rounded-full flex items-center justify-center mx-auto text-[var(--text-primary)]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-mono-tech">
                  PAYLOAD_TRANSMITTED
                </h3>
                <p className="text-xs opacity-75 max-w-sm mx-auto font-mono-tech">
                  Mail client opened for vipingupta.fin@gmail.com.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                  }}
                  className="px-6 py-2.5 bg-[var(--btn-main-bg)] text-[var(--btn-main-text)] text-xs font-mono-tech font-bold rounded-full hover:opacity-90 mt-4 shadow-md cursor-pointer"
                >
                  SEND_ANOTHER_PAYLOAD
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="font-mono-tech text-xs font-bold opacity-60 mb-2 block tracking-widest uppercase">
                    USER_IDENTIFIER
                  </label>
                  <div className="flex items-center bg-[var(--badge-bg)] border border-[var(--card-border)] rounded-2xl focus-within:border-[var(--card-border)] transition-all">
                    <span className="px-4 font-bold font-mono-tech opacity-70">&gt;</span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="NAME_REQUIRED"
                      className="bg-transparent border-none focus:ring-0 w-full font-mono-tech text-xs py-4 placeholder:opacity-40"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-xs font-bold opacity-60 mb-2 block tracking-widest uppercase">
                    SECURE_CHANNEL
                  </label>
                  <div className="flex items-center bg-[var(--badge-bg)] border border-[var(--card-border)] rounded-2xl focus-within:border-[var(--card-border)] transition-all">
                    <span className="px-4 font-bold font-mono-tech opacity-70">&gt;</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="EMAIL_REQUIRED"
                      className="bg-transparent border-none focus:ring-0 w-full font-mono-tech text-xs py-4 placeholder:opacity-40"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono-tech text-xs font-bold opacity-60 mb-2 block tracking-widest uppercase">
                    DATA_PAYLOAD
                  </label>
                  <div className="flex items-start bg-[var(--badge-bg)] border border-[var(--card-border)] rounded-2xl focus-within:border-[var(--card-border)] transition-all">
                    <span className="px-4 pt-4 font-bold font-mono-tech opacity-70">&gt;</span>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="WRITE_MESSAGE_HERE..."
                      className="bg-transparent border-none focus:ring-0 w-full font-mono-tech text-xs py-4 placeholder:opacity-40 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[var(--btn-main-bg)] text-[var(--btn-main-text)] rounded-full font-mono-tech text-xs font-extrabold tracking-[0.2em] hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>ENCRYPTING_PAYLOAD...</span>
                    </>
                  ) : (
                    <>
                      <span>EXECUTE_CONTACT</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
