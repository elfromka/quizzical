import ContentLoader from "react-content-loader";

/**
 * Generates an SVG loader for a single question in the Questions page.
 *
 * @return {JSX.Element} for the question, its' answers and a separator.
 */
const Loader: React.FC = (): JSX.Element => (
    <>
        <ContentLoader
            speed={2}
            width={"100%"}
            height={100}
            viewBox="0 0 550 100"
            backgroundColor="#4d5b9e"
            foregroundColor="#d1daec"
        >
            <rect x="0" y="7" rx="3" ry="3" width="100%" height="18" />
            <rect x="0" y="34" rx="3" ry="3" width="300" height="18" />
            <rect x="0" y="64" rx="3" ry="3" width="100" height="23" />
            <rect x="115" y="64" rx="3" ry="3" width="100" height="23" />
            <rect x="230" y="64" rx="3" ry="3" width="100" height="23" />
            <rect x="345" y="64" rx="3" ry="3" width="100" height="23" />
        </ContentLoader>

        <hr className="separator" />
    </>
);

export default Loader;
