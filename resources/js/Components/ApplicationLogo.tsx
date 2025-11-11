import logo from "@/assets/main-logo.png";

export default function ApplicationLogo(props: React.ComponentProps<"img">) {
    return <img src={logo} alt="Dasa" {...props} />;
}
