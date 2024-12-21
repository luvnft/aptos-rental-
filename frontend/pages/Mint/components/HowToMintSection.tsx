interface HowToMintSectionProps {}

export const HowToMintSection: React.FC<HowToMintSectionProps> = () => {
  return (
    <section className="w-full max-w-screen-xl px-4 mx-auto text-center how-to-mint-container">
      <h2 className="heading-md">How To ®️ent</h2>

      <ol className="flex flex-col items-center gap-6 pt-6 md:flex-row md:justify-between">
        {["Connect Your Wallet", "Create Agreement", "Deposit Money ヅ"].map((text, index) => (
          <li key={index} className="flex items-center gap-4 basis-1/4">
            <span className="title-md text-secondary-text">{index + 1}</span>
            <p className="text-left body-sm">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};
