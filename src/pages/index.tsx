import Layout from "~/components/Layout";
import "~/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
    return (
        <Layout>
            <meta
                name="description"
                content="This is my first Pokemon based homepage."
            />
            <title>Pokacid</title>
            <link rel="icon" type="image" href="/favicon.png" />
            <p className="text-3xl text-center pt-2 font-semibold pb-24">
                Hi, i`m Marvin! Or Acid, if you want! <br /> Feel free to
                explore my first website!
            </p>
            <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
                <Link
                    href="/pokedex-site"
                    className="p-12 border border-black rounded-md bg-black text-white hover:border-white w-fit"
                >
                    Watch your Pokedex
                </Link>
            </div>
        </Layout>
    );
}
