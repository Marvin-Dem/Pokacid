import Layout from "~/components/Layout";
import "~/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
    return (
        <Layout>
            <p className="text-3xl text-center pt-2 font-semibold pb-24">
                Hi, i`m Marvin! Or Acid, if you want! <br /> Feel free to
                explore my first website!
            </p>
            <div className="grid grid-cols-2 gap-4 w-fit mx-auto">
                <Link
                    href="/pokedex-site"
                    className="p-12 border border-black rounded-md bg-indigo-200 hover:bg-indigo-300 w-fit"
                >
                    Watch your Pokedex
                </Link>
            </div>
        </Layout>
    );
}
