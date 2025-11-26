import { createIntegration, createComponent } from "@gitbook/runtime";

const CompareBlock = createComponent({
  componentId: "chainlove-compare",
  async action(prev, action) {
    if (action.action === "@link.unfurl" && "url" in action) {
      return { props: { url: String(action.url) } };
    }
    return {};
  },
  async render({ props }) {
    const url = props?.url;

    return (
      <block>
        <webframe source={{ url }} aspectRatio={0.5} />
      </block>
    );
  },
});

export default createIntegration({ components: [CompareBlock] });
