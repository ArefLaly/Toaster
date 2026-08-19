import type { Preview } from "@storybook/react";
import "../src/styles/toastra.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "paper",
      values: [
        { name: "paper", value: "#f4efe6" },
        { name: "ink", value: "#16130f" },
      ],
    },
  },
};

export default preview;
