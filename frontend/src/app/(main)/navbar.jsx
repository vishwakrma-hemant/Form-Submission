"use client";
import {
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Paper,
  Title,
  Divider,
  Button,
  Box,
  Drawer,
  ScrollArea,
  rem,
  UnstyledButton,
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import classes from "./navbar.module.css";
import Link from "next/link";
import ActionTog from "./action/page";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
  { link: "/", label: "Enter School Details" },
  { link: "/viewData", label: "See Enter Details" },
];

const Navbar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);


  const pathname = usePathname();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} className={clsx(classes.link, (link.link == pathname && classes.linkActive ))}>
        {link.label}
      </Link>
    );
  });

  return (
    <Box>
      <header className={classes.header}>
        <Paper
          padding="md"
          style={{ position: "fixed", width: "100%", zIndex: 1000, top: 0 }}
        >
          <Container size="lg">
            <div className={classes.inner}>
              <Title
                order={3}
                component={Link}
                href="/"
                className={classes.title}
              >
                School Database
              </Title>
              <Group gap={1} visibleFrom="sm" fs={"md"}>
                {items}
              </Group>
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                hiddenFrom="sm"
              />
              <ActionTog />
            </div>
          </Container>
        </Paper>
      </header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="School Data Management"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <a href="/" className={classes.link}>
            Enter School Details
          </a>
          <a href="/viewData" className={classes.link}>
            See Enter Details
          </a>
          <Divider my="sm" />
          <ActionTog />
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Navbar;