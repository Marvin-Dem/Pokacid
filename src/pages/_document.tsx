import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <meta
                    name="description"
                    content="This is my first Pokemon based homepage."
                />
                <title>Pokacid</title>
                <link rel="icon" type="image" href="/favicon.png" />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
