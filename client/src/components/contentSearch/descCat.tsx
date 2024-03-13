const infOptions = [
  {
    header: "Services pour votre maison",
    desc: "Explorez une diversité de services dédiés à votre espace de vie, couvrant des aspects allant des réparations essentielles aux améliorations esthétiques, ainsi que des solutions de nettoyage spécialisées.",
  },
  {
    header: "Services personnels et de soins",
    desc: "Découvrez des services attentifs et personnalisés, allant de la garde d'enfants à la garde d'animaux, ainsi que des solutions d'assistance personnelle répondant à vos besoins spécifiques.",
  },
  {
    header: "Services extérieurs et événementiels",
    desc: "Transformez vos espaces extérieurs avec des professionnels compétents. Des services de jardinage aux solutions événementielles, trouvez tout ce dont vous avez besoin pour rendre vos moments spéciaux encore plus mémorables.",
  },
  {
    header: "Services éducatifs et de soutien",
    desc: "Investissez dans votre apprentissage avec des services éducatifs variés. Du soutien académique à des conseils éducatifs personnalisés, nos professionnels sont là pour vous accompagner dans votre parcours d'apprentissage.",
  },
  {
    header: "Services de santé et bien-être",
    desc: "Priorisez votre bien-être avec des services dédiés à la santé. Des solutions de remise en forme aux services de bien-être, explorez une gamme de services pour prendre soin de votre corps et de votre esprit.",
  },
];
interface descCat {
  selectedCatP: number;
  setSelectedCatP: (i: number) => void;
}

const DescCat: React.FC<descCat> = (p) => {
  return (
    <section className="px-4 mx-auto max-w-8xl">
      <div className="grid mt-3 mb-6 lg:gap-8 lg:mt-5 lg:mb-6 xl:grid-cols-3">
        <div className="col-span-2 mb-2 lg:mb-0">
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {infOptions[p.selectedCatP].header}
          </h1>
          <p className="text-lg text-gray-500 xl:mr-64 lg:mb-0 dark:text-gray-400">
            {infOptions[p.selectedCatP].desc}
          </p>
        </div>
        <div className="lg:ml-auto" />
      </div>
    </section>
  );
};

export default DescCat;
