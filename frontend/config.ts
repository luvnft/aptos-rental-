import Placeholder1 from "@/assets/placeholders/bear-1.png";
import Placeholder2 from "@/assets/placeholders/bear-2.png";
import Placeholder3 from "@/assets/placeholders/bear-3.png";

export const config: Config = {
  // Removing one or all of these socials will remove them from the page
  socials: {
    twitter: "https://twitter.com/kunaldhongade",
    discord: "https://discord.com",
    homepage: "https://kunaldhongade.vercel.app",
  },

  defaultCollection: {
    name: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue convallis augue in pharetra.",
    image: Placeholder1,
  },

  ourStory: {
    title: "Our Story",
    subTitle: "Innovative Insurance Platform on Aptos",
    description:
      "Our Insurance Platform Offers Various Insurance Products to Protect Your Assets. We Provide a Secure and Transparent Platform for Buying and Selling Insurance. Join Our Community to Get Started!",
    discordLink: "https://discord.com",
    images: [Placeholder1, Placeholder2, Placeholder3],
  },

  ourTeam: {
    title: "Our Team",
    members: [
      {
        name: "Kunal",
        role: "Blockchain Developer",
        img: Placeholder1,
        socials: {
          twitter: "https://twitter.com/kunaldhongade",
        },
      },
      {
        name: "Soham",
        role: "Marketing Specialist",
        img: Placeholder2,
      },
      {
        name: "Amrita",
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
        title: "What is Micro Insurance?",
        description:
          "Micro insurance is a type of insurance designed to be affordable for low-income individuals or groups, providing coverage for specific risks such as health, life, or property.",
      },
      {
        title: "How do I purchase an insurance policy?",
        description: `To purchase an insurance policy, follow these steps:
        Navigate to the "Buy Insurance" section in the app.
        Select the type of insurance you need.
        Fill in the required details and submit your application.
        Make the payment through the available payment methods.
        Confirm the transaction in your connected wallet.`,
      },
      {
        title: "What types of insurance products are available?",
        description:
          "We offer a variety of insurance products including health insurance, life insurance, and property insurance. Each product is tailored to meet the specific needs of our customers.",
      },
      {
        title: "How can I file a claim?",
        description: `To file a claim, follow these steps:
        Navigate to the "File a Claim" section in the app.
        Provide the necessary details about the incident.
        Submit any required documentation.
        Our team will review your claim and get back to you with the next steps.`,
      },
      {
        title: "What should I do if I encounter an issue with my policy?",
        description: `If you encounter an issue with your policy, consider the following:
        Ensure that all your details are correctly entered.
        Refresh the app and check your policy details again.
        Contact our support team for further assistance.`,
      },
      {
        title: "How can I view my policy details?",
        description: `You can view your policy details by navigating to the "My Policies" section of the app. This section will display all your active policies, including coverage details, premium amounts, and expiration dates.`,
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
