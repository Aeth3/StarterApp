import React from "react";
import renderer from "react-test-renderer";
import DynamicRenderer from "../package/components/DynamicRenderer";

describe("DynamicRenderer", () => {
    const renderJson = async (element) => {
        let instance;
        await renderer.act(async () => {
            instance = renderer.create(element);
        });
        return instance.toJSON();
    };

    it("renders fallback for unknown type", async () => {
        const tree = await renderJson(
            <DynamicRenderer item={{ type: "unknown" }} config={{}} />
        );

        expect(tree).toBeTruthy();
        expect(tree.type).toBe("Text");
    });

    it("renders fallback for invalid item", async () => {
        const tree = await renderJson(
            <DynamicRenderer item={null} config={{}} />
        );

        expect(tree).toBeTruthy();
        expect(tree.type).toBe("Text");
    });

    it("renders fallback for invalid config", async () => {
        const tree = await renderJson(
            <DynamicRenderer item={{ type: "stories" }} config={{ stories: "bad" }} />
        );

        expect(tree).toBeTruthy();
        expect(tree.type).toBe("Text");
    });
});
