import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const useRegister = () => {
  const { result } = useQuery(gql`
    query captcha {
      captcha {
        base64Captcha
        captchaId
      }
    }
  `);

  return {
    result,
  };
};

export default useRegister