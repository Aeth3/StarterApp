import React from "react";
import renderer from "react-test-renderer";
import DynamicRenderer from "../package/components/DynamicRenderer";

describe("DynamicRenderer", () => {
    it("renders fallback for unknown type", () => {
        const tree = renderer.create(
            <DynamicRenderer item={{ type: "unknown" }} config={{}} />
        ).toJSON();

        expect(tree).toBeTruthy();
        expect(tree.type).toBe("Text");
    });

    it("renders fallback for invalid item", () => {
        const tree = renderer.create(
            <DynamicRenderer item={null} config={{}} />
        ).toJSON();

        expect(tree).toBeTruthy();
        expect(tree.type).toBe("Text");
    });

    it("renders fallback for invalid config", () => {
        const tree = renderer.create(
            <DynamicRenderer item={{ type: "stories" }} config={{ stories: "bad" }} />
        ).toJSON();

        expect(tree).toBeTruthy();
        expect(tree.type).toBe("Text");
    });
});
