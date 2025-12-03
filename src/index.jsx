import { createIntegration, createComponent } from "@gitbook/runtime";

const CompareBlock = createComponent({
  componentId: "chainlove-compare",

  async action(prev, action) {
    console.log("[Integration][Variant2] action received:", action);

    if (action.action === "@link.unfurl" && "url" in action) {
      console.log(
        "[Integration][Variant2] @link.unfurl url =",
        String(action.url)
      );
      return { props: { ...(prev.props || {}), url: String(action.url) } };
    }

    if (action.action === "@webframe.ready") {
      console.log("[Integration][Variant2] @webframe.ready received");
      return { props: { ...(prev.props || {}) } };
    }

    if (action.action === "@webframe.resize") {
      console.log(
        "[Integration][Variant2] @webframe.resize received in integration:",
        action
      );
      return { props: { ...(prev.props || {}) } };
    }

    return { props: { ...(prev.props || {}) } };
  },

  async render({ props }) {
    const url = props?.url;

    console.log("[Integration][Variant2] render with props:", props);

    return (
      <block>
        <webframe source={{ url }} aspectRatio={0.01} />
      </block>
    );
  },
});

export default createIntegration({ components: [CompareBlock] });
