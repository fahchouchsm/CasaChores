import { useEffect, useState } from "react";
import Navigator from "../components/newPost/navigator";
import Content0 from "../components/newPost/content0";
import Content1 from "../components/newPost/content1";
import Content2 from "../components/newPost/content2";
import axios from "axios";

interface newPost {
  loged: boolean;
  userData: any;
}

const NewPost: React.FC<newPost> = ({ loged, userData }) => {
  const [step, setStep] = useState<number>(0);

  const toLogin = () => {
    window.location.href = "/login";
  };
  if (!loged || !userData.seller) {
    toLogin();
  } else if (!userData.seller) {
    window.location.href = "/";
  }
  // * step 0
  const [typeWork, setTypeWork] = useState<string>("");
  const [city, setCity] = useState("");
  const [adresse, setAdresse] = useState("");
  const [phone, setPhone] = useState<boolean>(false);
  const [cityErr, setCityErr] = useState("");
  const [typeWorkErr, settypeWorkErr] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:3001/new/post/check", userData, {
        withCredentials: true,
      })
      .then((res) => {
        const { step0, step1 } = res.data.result;

        if (step1) {
          setmainCat(step1.mainCat);
          setSubCat(step1.subCat);
          setSubCat1(step1.subCat1);
          setTitle(step1.title);
          setDescription(step1.description);
          setStep(2);
        } else if (step0) {
          setTypeWork(step0.typeWork);
          setCity(step0.city);
          setAdresse(step0.adresse);
          setPhone(step0.hiddenPhone);
          setStep(1);
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [content, setContent] = useState<any>(0);
  const [loading, setLoading] = useState(false);

  // * step 1
  const [mainCat, setmainCat] = useState("");
  const [subCat, setSubCat] = useState("");
  const [subCat1, setSubCat1] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [catErr, setcatErr] = useState("");
  const [titleErr, setTitleErr] = useState("");

  // ? validation
  const validation0 = () => {
    if (typeWork === "") {
      settypeWorkErr("Type de travail est requise");
      return false;
    }
    if (city === "") {
      setCityErr("City is required");
      settypeWorkErr("");
      return false;
    }

    setCityErr("");
    settypeWorkErr("");
    return true;
  };

  const validation1 = () => {
    if (mainCat === "" || subCat === "" || subCat1 === "") {
      setcatErr("Veuillez selectionner une categorie");
      return false;
    } else if (title === "") {
      setcatErr("");
      setTitleErr("Titre est requise");
      return false;
    } else if (title.length < 7) {
      setTitleErr("Titre est trop court");
      return false;
    }

    setcatErr("");
    setTitleErr("");
    return true;
  };

  // ! send data
  const sendData0 = () => {
    setLoading(true);
    if (!validation0()) {
      setLoading(false);
      return false;
    }

    setLoading(true);
    axios
      .post(
        "http://localhost:3001/new/post/step0",
        {
          typeWork,
          city,
          adresse,
          phone,
        },
        { withCredentials: true },
      )
      .then((result) => {
        setLoading(false);
        setStep(step + 1);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const sendData1 = () => {
    setLoading(true);
    if (!validation1()) {
      setLoading(false);
      return false;
    }

    axios
      .post(
        "http://localhost:3001/new/post/step1",
        { mainCat, subCat, subCat1, title, description },
        { withCredentials: true },
      )
      .then((result) => {
        setLoading(false);
        setStep(step + 1);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    switch (step) {
      case 0:
        setContent(
          <Content0
            adresse={adresse}
            cityErr={cityErr}
            typeWorkErr={typeWorkErr}
            userData={userData}
            city={city}
            phone={phone}
            setAdresse={setAdresse}
            setCity={setCity}
            setPhone={setPhone}
            setTypeWork={setTypeWork}
            typeWork={typeWork}
          />,
        );
        break;
      case 1:
        setContent(
          <Content1
            typeWork={typeWork}
            description={description}
            title={title}
            catErr={catErr}
            titleErr={titleErr}
            setSubCat1={setSubCat1}
            setDescription={setDescription}
            setTitle={setTitle}
            mainCat={mainCat}
            setSubCat={setSubCat}
            setmainCat={setmainCat}
          />,
        );
        break;
      case 2:
        setContent(<Content2 />);
        break;
    }
  }, [
    adresse,
    catErr,
    city,
    cityErr,
    description,
    mainCat,
    phone,
    step,
    title,
    titleErr,
    typeWork,
    typeWorkErr,
    userData,
  ]);

  return (
    <>
      <div className="bg-gray-100 pb-12">
        <Navigator step={step} setSteps={setStep} />
        <section className="rounded-lg md:mx-36 sm:mx-12 mx-4 bg-white sm:px-10 px-5 mt-10">
          <div className="max-w-2xl px-4 py-8 mx-auto lg:py-12">{content}</div>
        </section>
      </div>
      <div className="h-20 w-full sticky bottom-0 flex items-center bg-white shadow-2xl p-4">
        <button
          disabled={loading ? true : false}
          type="submit"
          className="ml-auto px-7 py-2.5 text-center  text-white bg-gray-800 hover:bg-gray-700
                font-medium rounded-lg text-sm focus:outline-none"
          onClick={() => {
            switch (step) {
              case 0:
                sendData0();
                break;
              case 1:
                sendData1();
                break;
            }
          }}
        >
          {loading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Chargement...
            </>
          ) : (
            "Suivant"
          )}
        </button>
      </div>
    </>
  );
};

export default NewPost;
