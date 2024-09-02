import { useI18n } from "vue-i18n";

type Message = {
  en: {
    [id: string]: string;
  },
  fr: {
    [id: string]: string;
  },
}


export const useTranslation = (messages?: Message) => {
  const { t } = useI18n({
    useScope: "global",
    inheritLocale: true,
    messages,
  });

  return t;
};
