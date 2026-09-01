export const site = {
  name: "FaisalTown Groups",
  domain: "https://www.faisaltowngroups.com/",
  phoneDisplay: "0092-335-8049806",
  phoneWhatsApp: "923358049806",
  defaultImage: "/assets/faisal-town-ii/hero-masterplan-preview.webp",
  disclosure: "Independent property information and buyer-assistance website. Not presented as the official Faisal Town developer website."
};

export const whatsappLink = (query: string) =>
  `https://wa.me/${site.phoneWhatsApp}?text=${encodeURIComponent(`Website: ${site.domain}\nQuery: ${query}`)}`;
