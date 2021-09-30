import React, {FunctionComponent, useEffect, useState} from "react"

import Link from "next/link";
import Image from "next/image";

import xpShield from '../../public/images/xp-shield.svg';

type HeaderProps = {
    siteTitle?: string
}

const Header: FunctionComponent<HeaderProps> = ({ siteTitle }: HeaderProps) => {

    return (
        <header
            style={{
                background: `rebeccapurple`,
                marginBottom: `1.45rem`,
            }}
        >
            <div
                style={{
                    margin: `0 auto`,
                    maxWidth: 960,
                    padding: `1.45rem 1.0875rem`,
                    display: `flex`,
                    justifyContent: 'space-between'
                }}
            >
                <h1 style={{margin: 0}}>
                    <Link
                        href="/">
                        <a style={{
                            color: `white`,
                            textDecoration: `none`,
                        }}
                        >
                            {siteTitle}
                        </a>
                    </Link>
                </h1>
                <Image src={xpShield}
                       width={33}
                       height={40}
                       alt={"Enonic XP logo"}
                />
            </div>
        </header>
    )
}

export default Header
