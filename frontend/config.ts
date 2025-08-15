import Placeholder1 from "@/assets/placeholders/1.png";
import Placeholder2 from "@/assets/placeholders/2.png";
import Placeholder3 from "@/assets/placeholders/3.png";
import Placeholder4 from "@/assets/placeholders/land-4.png";
import Placeholder5 from "@/assets/placeholders/door-5.png";
import Placeholder6 from "@/assets/placeholders/rent-6.png";

export const config: Config = {
  // Removing one or all of these socials will remove them from the page
  socials: {
    twitter: "https://twitter.com/rntsocial",
    homepage: "https://lease.rnt.social",
  },

  defaultCollection: {
    name: "Rental Agreements",
    description: "Secure and transparent rental agreements on the Aptos blockchain.",
    image: Placeholder1,
  },

  ourStory: {
    title: "LEASE.",
    subTitle: "Easy as 1 2 3",
    description:
      "Lease. Aptos rental agreements use blockchain technology to make rental processes more transparent, efficient, and secure. Automate rent payments, reduce disputes with clear, unchangeable contracts, and save time and money by eliminating the need for middlemen.",
    discordLink: "https://rnt.social",
    images: [Placeholder1, Placeholder2, Placeholder3],
  },

  ourTeam: {
    title: "W3W",
    members: [
      {
        name: "What3Words App",
        role: "3 Word Address",
        img: Placeholder4,
      },
      {
        name: "Experience",
        role: "Simplifies check-in",
        img: Placeholder5,
      },
      {
        name: "Indoor Map",
        role: "Pinpoints indoor locations",
        img: Placeholder6,
      },
    ],
  },

  faqs: {
    title: "F.A.Q.",
    questions: [
      {
        title: "What is a Lease Agreement?",
        description:
          "A lease agreement is a contract between a landlord and a tenant that outlines the terms and conditions of the rental property on blockchain for public transparency.",
      },
      {
        title: "How do I create a lease agreement?",
        description: `To create a lease agreement, follow these steps:
        Navigate to the "Create Agreement" section in the app.
        Fill in the required details about the property and the parties involved.
        Submit the lease agreement for review.
        Once approved, both parties can sign the agreement digitally.`,
      },
      {
        title: "How do I manage deposits?",
        description:
          "Our platform allows you to securely manage lease rental deposits. You can track deposit amounts, release deposits, and handle disputes all within the app.",
      },
      {
        title: "What should I do if I encounter an issue with my agreement?",
        description: `If you encounter an issue with your agreement, consider the following:
        Ensure that all your details are correctly entered.
        Refresh the app and check your agreement details again.
        Contact our support team for further assistance.`,
      },
      {
        title: "How can I view my lease agreements?",
        description: `You can view your lease agreements by navigating to the "My Agreements" section of the app. This section will display all your active agreements, including terms, parties involved, and status.`,
      },
    ],
  },

  nftBanner: [Placeholder1, Placeholder2, Placeholder3],
};

export interface Config {
  socials?: {
    twitter?: string;
    discord?: string;
    homepage?: string;
  };

  defaultCollection?: {
    name: string;
    description: string;
    image: string;
  };

  ourTeam?: {
    title: string;
    members: Array<ConfigTeamMember>;
  };

  ourStory?: {
    title: string;
    subTitle: string;
    description: string;
    discordLink: string;
    images?: Array<string>;
  };

  faqs?: {
    title: string;
    questions: Array<{
      title: string;
      description: string;
    }>;
  };

  nftBanner?: Array<string>;
}

export interface ConfigTeamMember {
  name: string;
  role: string;
  img: string;
  socials?: {
    twitter?: string;
    discord?: string;
  };
}
