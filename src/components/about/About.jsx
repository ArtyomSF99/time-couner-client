import { Link } from "react-router-dom";
import styles from "./about.module.scss";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.header}>
        ՃԱՐՏԱՐԱՊԵՏՈՒԹՅԱՆ ԵՎ ՇԻՆԱՐԱՐՈՒԹՅԱՆ ՀԱՅԱՍՏԱՆԻ ԱԶԳԱՅԻՆ ՀԱՄԱԼՍԱՐԱՆ
      </h1>
      <h2 className={styles.description}>
        Ինֆորմատիկա (համակարգչային գիտություն) մասնագիտությամբ բակալավրի
        որակավորման աստիճան հայցելու աշխատանք ԱՄԲԻՈՆ`Ինֆորմատիկա, հաշվողական
        տեխնիկա և կառավարման համակարգեր
      </h2>
      <h1 className={styles.title}>
        Հաշվապահական գործառույթների ավտոմատացված համակարգերի մշակում
      </h1>
      <Link to="/login">
        <button className={styles.button}>Սկսել</button>
      </Link>
      <div className={styles.infoBox}>
        <span>Խումբ՝ Կ-92</span>
        <span>Ուսանող՝ Արգիշտ Անդրեսյան</span>
      </div>
    </div>
  );
};

export default About;
