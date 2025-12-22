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

    // Let GitBook handle @webframe.ready / @webframe.resize internally.
    // We don't need to mutate props for those actions.
    if (action.action === "@webframe.ready") {
      console.log("[CompareBlock] @webframe.ready received");
      return { props: { ...prevProps } };
    }

    if (action.action === "@webframe.resize") {
      console.log("[CompareBlock] @webframe.resize received", action.size);
      return { props: { ...prevProps } };
    }

    // For any other actions, keep the previous props unchanged
    return { props: { ...prevProps } };
  },

  async render({ props }) {
    const url = props?.url;

    console.log("[CompareBlock] render with props:", props);

    return (
      <block>
        {/* aspectRatio is only the initial placeholder; height should be driven by @webframe.resize */}
        <webframe source={{ url }} />
      </block>
    );
  },
});

export default createIntegration({ components: [CompareBlock] });
