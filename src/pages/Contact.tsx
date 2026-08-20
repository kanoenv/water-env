import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageHero from '@/components/layout/PageHero';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ExternalLink,
  Send,
  AlertTriangle,
  MessageSquare,
  Building2,
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status: 'New',
      }]);
      if (error) throw error;

      toast({
        title: 'Message sent',
        description: 'Your message has been delivered to the Ministry desk. We will respond shortly.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact message failed:', err);
      toast({
        title: 'Could not send message',
        description: 'Please try again, or call the hotline on +234 803 071 9901.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };


  const channels = [
    {
      icon: AlertTriangle,
      code: 'CH-01',
      title: 'Emergency Hotline',
      description: 'Report pollution, illegal dumping, tree felling or environmental hazards — 24/7.',
      value: '+234 803 071 9901',
      href: 'tel:+2348030719901',
      accent: 'from-red-600 to-red-700',
    },
    {
      icon: Mail,
      code: 'CH-02',
      title: 'Complaints & Enquiries',
      description: 'Formal complaints, records requests and official correspondence.',
      value: 'complaints@environment.kn.gov.ng',
      href: 'mailto:complaints@environment.kn.gov.ng',
      accent: 'from-kano-primary to-kano-secondary',
    },
    {
      icon: Building2,
      code: 'CH-03',
      title: 'Head Office',
      description: 'Block 5, Audu Bako Secretariat, Kano State, Nigeria.',
      value: 'Open on Google Maps',
      href: 'https://www.google.com/maps/place/Ministry+of+Environment/@11.9840882,8.5386095,738m/data=!3m2!1e3!4b1',
      accent: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <PageHero
          eyebrow="Get in touch"
          title="Contact the Ministry"
          subtitle="Reach our offices, leadership and field teams across Kano State. We're here to listen, respond and partner with you."
          backgroundImage="/lovable-uploads/ef52aa35-5a46-44df-82a7-a54293a8cbbf.png"
          breadcrumbs={[{ label: 'Contact' }]}
        />

        {/* Channel dossiers */}
        <section className="py-16 bg-slate-50">
          <div className="container-custom">
            <div className="flex items-center gap-3 mb-3">
              <span className="h-px w-10 bg-kano-accent" />
              <span className="text-kano-primary uppercase tracking-[0.2em] text-xs font-semibold">Section 01 · Official Channels</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-10 max-w-3xl" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
              Three trusted ways to reach us
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {channels.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${c.accent}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${c.accent} text-white flex items-center justify-center shadow-md`}>
                        <c.icon className="w-7 h-7" />
                      </div>
                      <span className="font-mono text-[10px] text-slate-400 tracking-widest">{c.code}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{c.title}</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{c.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="font-semibold text-kano-primary text-sm break-all">{c.value}</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-kano-primary transition-colors" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Form + Info */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Form */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-10 bg-kano-accent" />
                  <span className="text-kano-primary uppercase tracking-[0.2em] text-xs font-semibold">Section 02 · Send a message</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                  Write to the Ministry
                </h2>
                <p className="text-slate-600 mb-8">
                  Complete the form below. Your message is logged directly into the Ministry's official records and routed to our communications desk.
                </p>

                <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text" id="name" name="name" value={formData.name} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-kano-primary focus:border-transparent transition"
                        placeholder="Your name" required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input
                        type="email" id="email" name="email" value={formData.email} onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-kano-primary focus:border-transparent transition"
                        placeholder="you@example.com" required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                    <input
                      type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-kano-primary focus:border-transparent transition"
                      placeholder="Subject of your message" required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                    <textarea
                      id="message" name="message" rows={6} value={formData.message} onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-kano-primary focus:border-transparent transition resize-none"
                      placeholder="Your message here..." required
                    />
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-kano-primary" />
                      Delivered securely to the Ministry's official inbox
                    </p>
                    <Button type="submit" disabled={isSending} className="bg-kano-primary hover:bg-kano-secondary text-white px-8 py-6 text-base inline-flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      {isSending ? 'Sending…' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Info sidebar */}
              <aside className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="h-px w-10 bg-kano-accent" />
                  <span className="text-kano-primary uppercase tracking-[0.2em] text-xs font-semibold">Section 03 · Directory</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                  Contact information
                </h3>

                {[
                  { icon: MapPin, title: 'Address', lines: ['Block 5, Audu Bako Secretariat', 'Kano State, Nigeria'] },
                  { icon: Phone, title: 'Phone', lines: ['+234 803 071 9901'] },
                  { icon: Mail, title: 'Email', lines: ['complaints@environment.kn.gov.ng'] },
                  { icon: Clock, title: 'Working Hours', lines: ['Monday – Friday: 8:00 AM – 4:00 PM', 'Saturday & Sunday: Closed'] },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-kano-primary/40 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-kano-primary/10 text-kano-primary flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                        {item.lines.map((l, j) => <p key={j} className="text-slate-600 text-sm">{l}</p>)}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bg-gradient-to-br from-kano-primary to-kano-secondary text-white rounded-xl p-6">
                  <h4 className="font-bold mb-3 uppercase tracking-wider text-xs text-kano-accent">Connect with us</h4>
                  <div className="flex gap-3">
                    {[
                      { Icon: Facebook, href: 'https://facebook.com/kanoenvironment' },
                      { Icon: Twitter, href: 'https://twitter.com/kanoenvironment' },
                      { Icon: Instagram, href: 'https://instagram.com/kanoenvironment' },
                      { Icon: Youtube, href: 'https://youtube.com/@kanoenvironment' },
                    ].map(({ Icon, href }, i) => (
                      <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-white/10 hover:bg-kano-accent hover:text-kano-dark flex items-center justify-center transition-all">
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="pb-20 bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="h-px w-10 bg-kano-accent" />
                  <span className="text-kano-primary uppercase tracking-[0.2em] text-xs font-semibold">Section 04 · Location</span>
                </div>
                <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Merriweather', Georgia, serif" }}>
                  Find our head office
                </h2>
              </div>
              <a
                href="https://www.google.com/maps/place/Ministry+of+Environment/@11.9840882,8.5386095,738m/data=!3m2!1e3!4b1"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-kano-primary text-white px-5 py-3 rounded-lg hover:bg-kano-secondary transition-colors font-semibold"
              >
                <ExternalLink size={18} />
                Open in Google Maps
              </a>
            </div>

            <div className="h-[450px] bg-slate-200 rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.5577234567!2d8.5386095!3d11.9840882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae81a7e6151263%3A0x46d11be22f2243a3!2sMinistry%20of%20Environment!5e0!3m2!1sen!2sng!4v1234567890123"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="Ministry of Water Resources, Environment and Climate Change Location"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
