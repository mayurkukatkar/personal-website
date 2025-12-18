"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, FileText, Download } from "lucide-react";

interface ContactProps {
    config: {
        contactEmail: string | null
        resumeUrl: string | null
    }
}

export const Contact = ({ config }: ContactProps) => {
    return (
        <section id="contact" className="py-32 bg-background relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-8">
                    Ready to engineer <br />
                    <span className="text-primary">the next big thing?</span>
                </h2>

                <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
                    I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                    <a
                        href={`mailto:${config.contactEmail || "hello@example.com"}`}
                        className="px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg shadow-xl shadow-primary/25 hover:bg-primary/90 transition-transform hover:-translate-y-1 flex items-center gap-2"
                    >
                        <Mail size={20} />
                        Say Hello
                    </a>

                    {config.resumeUrl && (
                        <a
                            href={config.resumeUrl}
                            className="px-8 py-4 bg-white border border-border text-text-primary rounded-lg font-bold text-lg hover:bg-gray-50 transition-transform hover:-translate-y-1 flex items-center gap-2"
                        >
                            <Download size={20} />
                            Download Resume
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
};
