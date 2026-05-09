import { Container, Heading } from "@/app/common/Design";
import { FiAward, FiExternalLink } from "react-icons/fi";

const certifications = [
  {
    code: "ISO 9001",
    title: "Management de la qualité",
    href: "/certifications/9001%20SARL%20MAGRO%20STAR%20BOUNA.pdf",
  },
  {
    code: "ISO 14001",
    title: "Management environnemental",
    href: "/certifications/14001%20SARL%20MAGRO%20STAR%20BOUNA.pdf",
  },
  {
    code: "ISO 45001",
    title: "Santé et sécurité au travail",
    href: "/certifications/45001SARL%20MAGRO%20STAR%20BOUNA.pdf",
  },
];

function Certifications() {
  return (
    <section className="certifications py-12 relative z-10">
      <Container>
        <Heading
          title="Nos certifications ISO"
          subtitle="Notre engagement pour la qualité, l'environnement et la sécurité est certifié par des organismes indépendants. Cliquez sur un certificat pour le consulter."
        />

        <div className="content grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {certifications.map((cert) => (
            <a
              key={cert.code}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:border-green hover:shadow-lg transition-all ease-in-out"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green_100 text-green shrink-0">
                <FiAward size={26} />
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-primary">{cert.code}</div>
                <div className="text-sm text-gray-600">{cert.title}</div>
              </div>
              <FiExternalLink
                size={18}
                className="text-gray-400 group-hover:text-green transition-colors"
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Certifications;