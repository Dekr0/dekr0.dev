import Cal from "@calcom/embed-react";
import '../styles/scroll.css'

export const BookingComponent = () => (
    <Cal 
        calLink="dekr0"
        config={{
            name: "Your Name",
            email: "your@gmail.com",
            notes: "",
            guests: ["your@gmail.com"],
            theme: "dark"
        }}
    />
);
