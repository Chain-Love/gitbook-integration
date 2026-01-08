import { createIntegration, createComponent } from "@gitbook/runtime";

const CompareBlock = createComponent({
  componentId: "chainlove-compare",

  async action(prev, action) {
    const prevProps = prev.props || {};

    // Handle link unfurl to extract the URL for the webframe
    if (action.action === "@link.unfurl" && "url" in action) {
      const url = String(action.url);
      console.log("[CompareBlock] @link.unfurl url =", url);

      return {
        props: {
          ...prevProps,
          url,
        },
      };
    }

    // Handle @webframe.resize: persist size into props so we can
    // drive the <webframe> aspectRatio on re-render.
    if (action.action === "@webframe.resize" && action.size) {
      console.log("[CompareBlock] @webframe.resize received", action.size);

      return {
        props: {
          ...prevProps,
          size: action.size,
        },
      };
    }

    // @webframe.ready and any other actions do not need to change props
    if (action.action === "@webframe.ready") {
      console.log("[CompareBlock] @webframe.ready received");
    }

    return { props: { ...prevProps } };
  },

  async render({ props }) {
    const url = props?.url;
    const size = props?.size;

    const aspectRatio = size?.aspectRatio;

    console.log("[CompareBlock] render with props:", props);

    return (
      <block>
        <webframe source={{ url }} aspectRatio={aspectRatio} />
      </block>
    );
  },
});

export default createIntegration({ components: [CompareBlock] });
