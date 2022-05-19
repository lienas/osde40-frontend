import React, {useEffect, useState} from "react"
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    useBreakpointValue,
    useColorModeValue
} from "@chakra-ui/react";
import {FiMenu} from 'react-icons/fi';
import {PageProps} from "../../../_enonicAdapter/views/BasePage";
import {Logo2} from "../Logo2";
import {getUrl} from "../../../_enonicAdapter/utils";
import NextLink from "next/link";
import {DarkModeToggler} from "../DarkModeToggler";
import {Container} from "@chakra-ui/layout";


export interface HeaderProps extends PageProps {
    title: string;
    logoUrl: string;
}


const Header = (props: HeaderProps) => {
    const {title, logoUrl} = props;
    const [isDesktop, setIsDesktop] = useState(true);
    const breakpointValue = useBreakpointValue({base: false, lg: true});

    useEffect(() => {
        console.log('useEffect in header');
        setIsDesktop(breakpointValue || false);
    }, [breakpointValue])

    //const isDesktop = true;
    return (
        <Box as="section" pb={{base: '8', md: '12'}}>
            <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
                <Container py={{base: '4', lg: '5'}} maxW={"container.lg"}>
                    <HStack spacing="10" justify="space-between">
                        <Logo2 color={"brand.100"}/>
                        {isDesktop ? (
                            <Flex justify="space-between" flex="1">
                                <ButtonGroup variant="link" spacing="8">
                                    {props.common?.getMenuItems.map((item: any, key: number) => (
                                        <NextLink key={key} href={getUrl(item.path)} passHref>
                                            <Button as={"a"}
                                                    color={item.isActive ? "brand.100" : undefined}
                                                    variant={"link"}
                                                    size={"md"}
                                                    p={1}>
                                                {item.title}
                                            </Button>
                                        </NextLink>
                                    ))}
                                </ButtonGroup>
                                <HStack spacing="3">
                                    <Button variant="ghost">Sign in</Button>
                                    <Button variant="primary">Sign up</Button>
                                    <DarkModeToggler/>
                                </HStack>
                            </Flex>
                        ) : (
                            <IconButton
                                variant="ghost"
                                icon={<FiMenu fontSize="1.25rem"/>}
                                aria-label="Open Menu"
                            />
                        )}
                    </HStack>
                </Container>
            </Box>
        </Box>
    )
};


export default Header