import Placeholder1 from "@/assets/placeholders/bear-1.png";
import Placeholder2 from "@/assets/placeholders/bear-2.png";
import Placeholder3 from "@/assets/placeholders/bear-3.png";

export const config: Config = {
  // Removing one or all of these socials will remove them from the page
  socials: {
    twitter: "https://twitter.com/",
    discord: "https://discord.com",
    homepage: "/",
  },

  defaultCollection: {
    name: "Rental Agreements",
    description: "Secure and transparent rental agreements on the Aptos blockchain.",
    image: Placeholder1,
  },

  ourStory: {
    title: "Our Story",
    subTitle: "Revolutionizing Rental Agreements on Aptos",
    description:
      "Our platform offers a secure and transparent way to manage rental agreements and deposits. Join our community to experience the future of rental agreements!",
    discordLink: "https://discord.com",
    images: [Placeholder1, Placeholder2, Placeholder3],
  },

  ourTeam: {
    title: "Our Team",
    members: [
      {
        name: "Alex",
        role: "Blockchain Developer",
        img: Placeholder1,
        socials: {
          twitter: "https://twitter.com",
        },
      },
      {
        name: "Jordan",
        role: "Marketing Specialist",
        img: Placeholder2,
      },
      {
        name: "Taylor",
        role: "Community Manager",
        img: Placeholder3,
        socials: {
          twitter: "https://twitter.com",
        },
      },
    ],
  },

  faqs: {
    title: "F.A.Q.",

    questions: [
      {
        title: "What is a Rental Agreement?",
        description:
          "A rental agreement is a contract between a landlord and a tenant that outlines the terms and conditions of the rental property.",
      },
      {
        title: "How do I create a rental agreement?",
        description: `To create a rental agreement, follow these steps:
        Navigate to the "Create Agreement" section in the app.
        Fill in the required details about the property and the parties involved.
        Submit the agreement for review.
        Once approved, both parties can sign the agreement digitally.`,
      },
      {
        title: "How do I manage deposits?",
        description:
          "Our platform allows you to securely manage rental deposits. You can track deposit amounts, release deposits, and handle disputes all within the app.",
      },
      {
        title: "What should I do if I encounter an issue with my agreement?",
        description: `If you encounter an issue with your agreement, consider the following:
        Ensure that all your details are correctly entered.
        Refresh the app and check your agreement details again.
        Contact our support team for further assistance.`,
      },
      {
        title: "How can I view my agreements?",
        description: `You can view your agreements by navigating to the "My Agreements" section of the app. This section will display all your active agreements, including terms, parties involved, and status.`,
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
