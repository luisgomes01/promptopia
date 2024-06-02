"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useToggler, useLogin } from "@/hooks";
import {
  signIn,
  signOut,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

type Providers = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

interface IProvider {
  providers: Providers;
  setProviders: (providers: Providers) => void;
}

const Nav = () => {
  const { isLoggedIn } = useLogin();

  const [providers, setProviders] = useState<IProvider["providers"]>(null);

  useEffect(() => {
    const initializeProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    initializeProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <section>
        <Link href="/" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.svg"
            alt="Pomptopia Logo"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="logo_text">Promptopia</p>
        </Link>
      </section>
      <section className="sm:flex hidden">
        {isLoggedIn ? <Actions /> : <SignInOptions providers={providers} />}
      </section>

      <section className="sm:hidden flex relative">
        {isLoggedIn ? (
          <ActionsMobile />
        ) : (
          <SignInOptions providers={providers} />
        )}
      </section>
    </nav>
  );
};

export default Nav;

function Actions() {
  return (
    <div className="flex gap-3 md-gap-5">
      <Link href="/create-prompt" className="black_btn">
        Create Post
      </Link>
      <button onClick={() => signOut()} className="outline_btn">
        Sign Out
      </button>
      <Link href="/profile">
        <Image
          src="/assets/images/logo.svg"
          alt="Profile"
          width={37}
          height={37}
        />
      </Link>
    </div>
  );
}

type ProviderProps = Pick<IProvider, "providers">;

function SignInOptions({ providers }: Readonly<ProviderProps>) {
  return (
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            type="button"
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className="black_btn"
          >
            Sign In
          </button>
        ))}
    </>
  );
}

function ActionsMobile() {
  const { toggle, visible } = useToggler();

  return (
    <div className="flex">
      <Image
        src="/assets/images/logo.svg"
        alt="Profile"
        width={37}
        height={37}
        onClick={toggle}
      />

      {visible && (
        <div className="dropdown">
          <Link href="/profile" className="dropdown_link" onClick={toggle}>
            My Profile
          </Link>
          <Link
            href="/create-prompt"
            className="dropdown_link"
            onClick={toggle}
          >
            Create Prompt
          </Link>
          <button
            type="button"
            onClick={() => {
              toggle();
              signOut();
            }}
            className="mt-5 w-full black_btn"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
