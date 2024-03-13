import axios, { AxiosResponse } from "axios";

interface editNotification {
  settingsData: any;
  setSettingsData: (e: any) => void;
}

const EditNotification: React.FC<editNotification> = ({
  settingsData,
  setSettingsData,
}) => {
  const notifications = [
    {
      name: "Messages",
      desc: "Les professionnels vous envoient des messages.",
      ref: settingsData.notifications.messages,
      refName: "messages",
    },
    {
      name: "Mises à jour du projet",
      desc: "Recevez des rappels et des mises à jour concernant votre projet.",
      ref: settingsData.notifications.updates,
      refName: "updates",
    },
    {
      name: "Prise en charge du compte",
      desc: "Recevez des notifications liées à la sécurité de votre compte.",
      ref: settingsData.notifications.security,
      refName: "security",
    },
    {
      name: "Nouvelles évaluations",
      desc: "Soyez notifié des nouvelles évaluations de votre profil.",
      ref: settingsData.notifications.rating,
      refName: "rating",
    },
    {
      name: "Offres spéciales",
      desc: "Ne manquez aucune offre spéciale ou promotion.",
      ref: settingsData.notifications.offers,
      refName: "offers",
    },
    {
      name: "Autres notifications",
      desc: "Recevez d'autres notifications importantes.",
      ref: settingsData.notifications.others,
      refName: "others",
    },
  ];

  const emailNotifications = [
    {
      name: "Évaluations par e-mail",
      desc: "Soyez informé des nouvelles évaluations par e-mail.",
      ref: settingsData.emailNotifications.rating,
      refName: "rating",
    },
    {
      name: "Offres par e-mail",
      desc: "Recevez des offres spéciales et promotions par e-mail.",
      ref: settingsData.emailNotifications.offres,
      refName: "offres",
    },
    {
      name: "Mises à jour par e-mail",
      desc: "Restez à jour avec les dernières mises à jour par e-mail.",
      ref: settingsData.emailNotifications.updates,
      refName: "updates",
    },
    {
      name: "Sécurité par e-mail",
      desc: "Recevez des alertes de sécurité importantes par e-mail.",
      ref: settingsData.emailNotifications.security,
      refName: "security",
    },
    {
      name: "Autres notifications par e-mail",
      desc: "Recevez d'autres notifications importantes par e-mail.",
      ref: settingsData.emailNotifications.others,
      refName: "others",
    },
  ];

  const handleCheckboxChange = (refName: string, categorie: string) => {
    axios
      .post(
        `http://localhost:3001/usersettings/${categorie}/${refName}`,
        { refName },
        { withCredentials: true },
      )
      .then((result: AxiosResponse) => {
        setSettingsData(result.data.settingsData);
        console.log(settingsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const settings = [
    {
      name: "Recevez des notifications push sur...",
      data: notifications,
      children: notifications.map((mov, i) => {
        return (
          <div
            className="inline-flex items-center justify-center py-3 px-4 w-full 
        text-left text-base font-medium hover:bg-gray-50"
            key={i}
          >
            <div className="flex flex-col w-full ">
              <div className="">{mov.name}</div>
              <div className="text-sm text-gray-400 ">{mov.desc}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={mov.ref}
                onChange={() =>
                  handleCheckboxChange(mov.refName, "notifications")
                }
              />
              <div
                className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full
            rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:start-[2px]
            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5
            after:w-5 after:transition-all peer-checked:bg-gray-700"
              ></div>
            </label>
          </div>
        );
      }),
    },
    {
      name: "Envoyez-moi un e-mail à propos de...",
      data: emailNotifications,
      children: emailNotifications.map((mov, i) => {
        return (
          <div
            className="inline-flex items-center justify-center py-3 px-4 w-full 
        text-left text-base font-medium hover:bg-gray-50"
            key={i}
          >
            <div className="flex flex-col w-full ">
              <div className="">{mov.name}</div>
              <div className="text-sm text-gray-400 ">{mov.desc}</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={mov.ref}
                onChange={() =>
                  handleCheckboxChange(mov.refName, "emailNotifications")
                }
              />
              <div
                className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full
            rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:start-[2px]
            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5
            after:w-5 after:transition-all peer-checked:bg-gray-700"
              ></div>
            </label>
          </div>
        );
      }),
    },
  ];

  return (
    <div className="w-full mt-16">
      <div className="mx-12 sm:mx-16">
        <div className="text-xl font-semibold text-center pb-5">
          Notifications
        </div>
        {settings.map((mov, i) => {
          return (
            <div className="mb-6" key={i}>
              <div className="pb-2 pl-1.5">{mov.name}</div>
              <div className="flex flex-col border rounded-md divide-y">
                {mov.children}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditNotification;
