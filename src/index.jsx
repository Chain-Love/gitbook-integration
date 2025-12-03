import { createIntegration, createComponent } from "@gitbook/runtime";

const CompareBlock = createComponent({
  componentId: "chainlove-compare",

  async action(prev, action) {
    console.log("[Integration][Variant3] action received:", action);

    const prevProps = prev.props || {};

    if (action.action === "@link.unfurl" && "url" in action) {
      console.log(
        "[Integration][Variant3] @link.unfurl url =",
        String(action.url)
      );
      return {
        props: {
          ...prevProps,
          url: String(action.url),
        },
      };
    }

    if (action.action === "@webframe.ready") {
      console.log("[Integration][Variant3] @webframe.ready received");
      return { props: { ...prevProps } };
    }

    if (action.action === "@webframe.resize") {
      console.log(
        "[Integration][Variant3] @webframe.resize received in integration:",
        action
      );

      let nextProps = { ...prevProps };

      if (typeof action.aspectRatio === "number") {
        nextProps.aspectRatio = action.aspectRatio;
      }

      return { props: nextProps };
    }

    return { props: { ...prevProps } };
  },

  async render({ props }) {
    const url = props?.url;
    const aspectRatio =
      typeof props?.aspectRatio === "number" && props.aspectRatio > 0
        ? props.aspectRatio
        : 1;

    console.log("[Integration][Variant3] render with props:", props);

    return (
      <block>
        <webframe source={{ url }} aspectRatio={aspectRatio} />
      </block>
    );
  },
});

export default createIntegration({ components: [CompareBlock] });
