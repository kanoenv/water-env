import unido1 from "@/assets/news/unido-1.jpg.asset.json";
import unido2 from "@/assets/news/unido-2.jpg.asset.json";
import unido3 from "@/assets/news/unido-3.jpg.asset.json";
import unido4 from "@/assets/news/unido-4.jpg.asset.json";
import unido5 from "@/assets/news/unido-5.jpg.asset.json";
import unido6 from "@/assets/news/unido-6.jpg.asset.json";
import greenPark1 from "@/assets/news/green-park-1.jpg.asset.json";
import greenPark2 from "@/assets/news/green-park-2.jpg.asset.json";
import greenPark3 from "@/assets/news/green-park-3.jpg.asset.json";
import greenPark4 from "@/assets/news/green-park-4.jpg.asset.json";
import greenPark5 from "@/assets/news/green-park-5.jpg.asset.json";
import greenPark6 from "@/assets/news/green-park-6.jpg.asset.json";
import warawa1 from "@/assets/news/warawa-1.jpg.asset.json";
import warawa2 from "@/assets/news/warawa-2.jpg.asset.json";
import warawa3 from "@/assets/news/warawa-3.jpg.asset.json";
import warawa4 from "@/assets/news/warawa-4.jpg.asset.json";
import warawa5 from "@/assets/news/warawa-5.jpg.asset.json";
import warawa6 from "@/assets/news/warawa-6.jpg.asset.json";
import warawa7 from "@/assets/news/warawa-7.jpg.asset.json";
import certis1 from "@/assets/news/certis-1.jpg.asset.json";
import certis2 from "@/assets/news/certis-2.jpg.asset.json";
import certis3 from "@/assets/news/certis-3.jpg.asset.json";
import certis4 from "@/assets/news/certis-4.jpg.asset.json";
import sanitation1 from "@/assets/news/sanitation-1.jpg.asset.json";
import sanitation2 from "@/assets/news/sanitation-2.jpg.asset.json";
import sanitation3 from "@/assets/news/sanitation-3.jpg.asset.json";
import sanitation4 from "@/assets/news/sanitation-4.jpg.asset.json";
import sanitation5 from "@/assets/news/sanitation-5.jpg.asset.json";
import sanitation6 from "@/assets/news/sanitation-6.jpg.asset.json";

export type NewsItem = {
  id: string;
  title: string;
  date: string; // ISO
  displayDate: string;
  category: string;
  excerpt: string;
  cover: string;
  images?: string[];
  content: string[]; // paragraphs
  signoff?: string[];
};

export const newsItems: NewsItem[] = [
  {
    id: "northern-hub-sanitation-readiness-convening-2026",
    title:
      "Kano Hosts Northern Hub Private Sector Readiness Assessment Convening for Nigeria's Onsite Sanitation Sector",
    date: "2026-08-03",
    displayDate: "August 3, 2026",
    category: "Sanitation & Investment",
    cover: sanitation2.url,
    images: [sanitation1.url, sanitation3.url, sanitation4.url, sanitation5.url, sanitation6.url],
    excerpt:
      "The Honourable Commissioner delivered the keynote address and formally opened the Northern Hub Private Sector Readiness Assessment Convening for Nigeria's onsite sanitation sector, hosted by Kano State.",
    content: [
      "I delivered the keynote address and formally opened the Northern Hub Private Sector Readiness Assessment Convening for Nigeria's onsite sanitation sector, hosted by Kano State. I acknowledge DAI, the Federal Ministry of Water Resources and Sanitation, IsDB, AfDB, UNICEF, the World Bank and all participating partners for supporting this important engagement.",
      "Under the leadership of His Excellency, Alhaji Abba Kabir Yusuf, our administration is strengthening sanitation governance and developing investment opportunities in smart public toilets, organised faecal sludge management, digital monitoring and resource recovery.",
      "We welcome responsible investors, financial institutions and development partners to work with us in building an affordable, inclusive and commercially sustainable sanitation system that protects public health while empowering our teeming youths.",
    ],
    signoff: [
      "Dr. Dahir M. Hashim",
      "Honourable Commissioner",
      "Ministry of Water Resources, Environment and Climate Change",
      "Kano State",
    ],
  },
  {

    id: "certis-nigeria-waste-partnership-2026",
    title:
      "Kano State Signs Strategic Agreement with Certis Nigeria Limited to Modernise Waste Management and Drainage Infrastructure",
    date: "2026-07-27",
    displayDate: "July 27, 2026",
    category: "Partnership",
    cover: certis2.url,
    images: [certis1.url, certis4.url, certis3.url],
    excerpt:
      "The Ministry formalises a strategic working agreement with Certis Nigeria Limited to transition waste management into a sustainable, commercially viable model, secure climate finance and develop a Drainage Masterplan for Kano State.",
    content: [
      "The Kano State Ministry of Water Resources, Environment and Climate Change has formalized a strategic working agreement with Certis Nigeria Limited.",
      "This framework aims to transition our waste management infrastructure from a traditional social service into a sustainable, commercially viable growth model. Through this collaboration, Certis will provide the technical expertise needed to modernize our waste systems, secure vital climate finance, improve the operational management of our Effluent Treatment Plants, and help develop a comprehensive Drainage Masterplan for Kano State.",
      "Under the leadership of Governor Abba Kabir Yusuf, we remain fully committed to exploring innovative partnerships that guarantee a cleaner, healthier, and more sustainable environment for all our citizens.",
    ],
    signoff: [
      "Dr. Dahiru M. Hashim",
      "Honourable Commissioner",
      "Ministry of Water Resources, Environment and Climate Change",
      "Kano State",
    ],
  },
  {
    id: "warawa-water-supply-restored-2026",
    title:
      "Warawa Receives Water for the First Time in Over 5 Years as Pumping Commences Along Its Distribution Lines; Gaya and Dawakin Kudu to Follow",
    date: "2026-07-15",
    displayDate: "July 15, 2026",
    category: "Project Update",
    cover: warawa1.url,
    images: [warawa2.url, warawa3.url, warawa4.url, warawa5.url, warawa6.url, warawa7.url],
    excerpt:
      "Trial pumping commences along the Warawa LGA distribution line for the first time in over five years, with Gaya and Dawakin Kudu next as the Ministry revitalises Kano's regional water infrastructure.",
    content: [
      "Our ongoing efforts to revitalize Kano's regional water infrastructure are yielding transformative results, which I witnessed firsthand during a supervision visit to the Wudil and Joda water treatment plants, which possess design capacities of 25 and 9.6 MLD respectively. At the Wudil facility, Wudil Local Government Area will now be getting a consistent water supply. This massive improvement is largely due to the plant recently being placed on Band A electricity, which now guarantees 18 to 22 hours of power supply per day, up from a mere 1 hour per day.",
      "Even more remarkably, we have officially commenced trial pumping along the Warawa LGA distribution line to assess pressure and pinpoint system leakages. Once fully functional, this critical pipeline, which is seeing water flow for the first time in over half a decade, has the capacity to supply communities all the way to Rijiyar Gwan-gwan. Similar pressure testing along the Gaya and Dawakin Kudu lines will follow in the coming days to systematically restore service across those regions as well.",
      "Simultaneously, the Joda plant has resumed supply to several communities in Gabasawa LGA, supported by 7 active tube wells, with an additional 5 expected to come online shortly as we push the facility back to its maximum design capacity. Alongside these core hydraulic overhauls, essential civil works including office rehabilitation, perimeter fencing, and general site renovations will continue steadily to ensure the long-term security and efficiency of these vital state assets.",
      "None of these monumental strides would have been possible without the unwavering support and visionary leadership of His Excellency, Governor Abba Kabir Yusuf. I deeply commend the Governor for his absolute commitment and prioritization of the water sector, ensuring that the dividends of good governance and clean water reach every corner of Kano State.",
    ],
    signoff: [
      "Dr. Dahiru M. Hashim",
      "Honourable Commissioner",
      "Ministry of Water Resources, Environment and Climate Change",
      "Kano State",
    ],
  },
  {
    id: "kano-unido-eu-circular-economy-2026",
    title:
      "Kano Partners UNIDO, EU to Advance Circular Economy, Renewable Energy Waste Management",
    date: "2026-06-29",
    displayDate: "June 29, 2026",
    category: "Press Release",
    cover: unido5.url,
    images: [unido1.url, unido2.url, unido3.url, unido4.url, unido6.url],
    excerpt:
      "Kano State reaffirms its commitment to circular economy and renewable energy waste management through partnerships with UNIDO, the EU and the Federal Ministry of Environment.",
    content: [
      "The Kano State Government, under the leadership of His Excellency Alhaji Abba Kabir Yusuf, has reaffirmed its commitment to advancing circular economy practices and sustainable renewable energy waste management through partnerships with the United Nations Industrial Development Organization (UNIDO), the European Union (EU), the Federal Ministry of Environment, and other development partners.",
      "The Honourable Commissioner for Water Resources, Environment and Climate Change, Dr. Dahiru Muhammad Hashim, made the commitment while declaring open the State-Level Capacity Building Training on the National Data Monitoring System for Used Off-Grid Renewable Energy Equipment (OGREE) Waste Management on Monday, June 29, 2026.",
      "The two-day training, hosted by Kano State, brings together representatives of the Federal Ministry of Environment, UNIDO, the European Union, the African Battery Recycling and Recovery Initiative (ARBR), associate states, technical experts, and other stakeholders to strengthen institutional capacity for the safe management of renewable energy waste and improve environmental data systems.",
      "Speaking at the event, Dr. Hashim said the rapid transition to renewable energy must be accompanied by responsible management of end-of-life solar panels, batteries, inverters, and other renewable energy equipment.",
      "\"The success of the clean energy transition will ultimately be measured not only by the number of renewable energy systems we deploy, but also by how responsibly we manage their entire lifecycle,\" he said.",
      "The Commissioner highlighted Kano's efforts to strengthen environmental governance through climate policies, legal reforms, digital environmental data systems, and investments in waste management and ecosystem restoration, including a target to plant 10 million trees this year.",
      "He added that the state is revitalising public green spaces, modernising waste management through colour-coded waste segregation systems and improved sanitation equipment, reviving the Dorayi Compost Plant, and developing a Circular Economy Industrial Cluster in Gabasawa that is expected to become one of Nigeria's largest integrated circular economy hubs.",
      "He said Kano is ready to deepen collaboration with UNIDO, the EU, and other partners to advance circular economy development, recycling infrastructure, digital environmental monitoring, and renewable energy waste management.",
      "\"Having consistently demonstrated political commitment, institutional readiness and policy leadership, Kano stands prepared to serve as a leading demonstration state for circular economy implementation in Northern Nigeria and across the country,\" Dr. Hashim added.",
      "He urged participants to use the two-day training to build partnerships and translate knowledge into practical actions that will strengthen environmental institutions and support Nigeria's transition to a cleaner and more sustainable future.",
    ],
    signoff: [
      "Signed:",
      "Dr. Dahiru Muhammad Hashim",
      "Honourable Commissioner",
      "Ministry of Water Resources, Environment and Climate Change",
      "Kano State",
    ],
  },
  {
    id: "green-park-audu-bako-redevelopment-2026",
    title: "Green Park Redevelopment Along Audu Bako Way Nears Completion",
    date: "2026-06-28",
    displayDate: "June 28, 2026",
    category: "Project Update",
    cover: greenPark1.url,
    images: [greenPark2.url, greenPark3.url, greenPark4.url, greenPark5.url, greenPark6.url],
    excerpt:
      "Progress update on the ongoing redevelopment of the Green Park along Audu Bako Way, which is now nearing completion.",
    content: [
      "Progress update on the ongoing redevelopment of the Green Park along Audu Bako Way, which is now nearing completion.",
      "Once a location associated with various illicit activities, the area is being transformed into a safe, attractive, and environmentally sustainable public space. This intervention reflects the vision of His Excellency, Governor Abba Kabir Yusuf, to provide residents with accessible recreational facilities and revitalized green spaces that promote healthier and more livable communities.",
    ],
    signoff: [
      "Dr. Dahir M. Hashim",
      "Honourable Commissioner",
      "Ministry of Water Resources, Environment and Climate Change",
      "Kano State",
    ],
  },
  {
    id: "forest-guard-recruitment-2024",
    title: "Forest Guard Recruitment Programme Launched",
    date: "2024-02-20",
    displayDate: "February 20, 2024",
    category: "Press Release",
    cover: unido2.url,
    excerpt:
      "Applications are open for 200 forest guard positions as part of our commitment to strengthen environmental protection in Kano State.",
    content: [
      "The Ministry of Water Resources, Environment and Climate Change has officially launched the recruitment program for 200 Forest Guard positions. Successful candidates will undergo intensive training in forest management, wildlife protection, fire prevention, and community engagement.",
    ],
  },
];
