import Base from "../Components/Base";
import HomeBase from "./HomeBase";
import Para from "./Para";

function Home() {
  return (
    <>
      <div className="bg-yellow-100">
        <Base />
        <HomeBase />

        <div className="flex flex-col m-48px">
          <Para
            imageUrl="bg2.webp"
            imageAlt=""
            readMoreUrl="https://www.thehindu.com/opinion/lead/ridding-india-of-food-insecurity/article67296175.ece"
          >
            India may be the fastest growing large economy of the world, but it
            is also facing accelerating food-price inflation. The rise in the
            price of food first accelerated sharply in 2019, and has climbed in
            most years thereafter. In July this year, annual inflation exceeded
            11%, the highest in a decade. An implication of continuing high
            food-price inflation is that a section of the population could be
            facing hardship in consuming food of adequate nutritional value.
          </Para>
          <Para
            imageUrl="bg4.png"
            imageAlt=""
            readMoreUrl="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4367032/"
          >
            Malnutrition among under-five children is an important concern for
            the health authorities in India. The aim of the present review was
            to assess the burden of under-nutrition and over-nutrition, its
            determinants and strategies required to tackle malnutrition among
            under-five children in India.
          </Para>
          <Para
            imageUrl="bg.webp"
            imageAlt=""
            readMoreUrl="https://www.feedingindia.org/blog/understanding-the-malnutrition-crisis-in-india/"
          >
            India has one of the worst rates of child malnutrition in the world,
            with one third of malnourished children globally being Indian. As
            per the Government of India’s National Family Health Survey 5 (NFHS
            5), ‘Thirty-six percent of children under age five years are
            stunted; 19 percent are wasted; 32 percent are underweight; and 3
            percent are overweight. Children born to mothers with no schooling
            and children in the lowest wealth quintile are most likely to be
            undernourished’.
          </Para>
        </div>
      </div>
    </>
  );
}

export default Home;
