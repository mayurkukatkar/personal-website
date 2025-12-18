

import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { getHeroConfig, getFeaturedProjects, getSkills, getExperience } from "@/lib/data";

export const revalidate = 60 // ISR: Revalidate every 60 seconds

export default async function Home() {
  const config = await getHeroConfig()
  const projects = await getFeaturedProjects()
  const skills = await getSkills()
  const experience = await getExperience()

  return (
    <main className="min-h-screen bg-background text-text-primary selection:bg-primary/20">
      <Navbar />
      <Hero config={config} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Experience experience={experience} />
      <Contact config={config} />

      <footer className="py-8 border-t border-border text-center text-text-secondary text-xs font-mono">
        <div className="max-w-7xl mx-auto px-6">
          © {new Date().getFullYear()} • Java Backend Engineer • System Design
        </div>
      </footer>
    </main>
  );
}
