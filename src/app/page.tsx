import { ChapterSection } from "@/components/chapter-section";
import { Hero } from "@/components/hero";
import { ProjectPanel } from "@/components/project-panel";
import { SkillsPanel } from "@/components/skills-panel";
import { AboutPanel } from "@/components/about-panel";
import { ContactLinks } from "@/components/contact-links";
import { chapters } from "@/lib/chapters";
import { projects } from "@/lib/projects";

const [, sobreMi, proyectos, habilidades, contacto] = chapters;

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      <ChapterSection chapter={sobreMi} layout="full">
        <AboutPanel />
      </ChapterSection>

      <ChapterSection chapter={proyectos} layout="full">
        <div className="mt-10 space-y-24">
          {projects.map((project) => (
            <ProjectPanel key={project.slug} project={project} />
          ))}
        </div>
      </ChapterSection>

      <ChapterSection chapter={habilidades} layout="full">
        <p className="mt-6 max-w-[54ch] text-lg text-ink-soft">
          Lo que ya manejo, lo que he usado en proyectos reales y lo que estoy
          aprendiendo ahora mismo. Sin inflar nada.
        </p>
        <SkillsPanel />
      </ChapterSection>

      <ChapterSection chapter={contacto} layout="full">
        <p className="mt-6 max-w-[48ch] text-lg text-ink-soft">
          Busco mi primera oportunidad y me da mucho gusto que me escriban.
          Respondo por cualquiera de estos medios.
        </p>
        <ContactLinks />
      </ChapterSection>
    </main>
  );
}
