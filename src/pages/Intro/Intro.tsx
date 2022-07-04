import { Link } from "react-router-dom";
import styles from "./Intro.module.scss";

const Intro = () => (
    <>
        <p className={`${styles.test} red`}>Lorem.</p>
        Intro
        <Link to="/questions" />
    </>
);

export default Intro;
