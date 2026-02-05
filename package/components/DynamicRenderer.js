import { componentRegistry } from "./ComponentRegistry";

const DynamicRenderer = ({ item, config, iconMap = {}, secondaryIconsMap = {}, actionHandlers = {}, props }) => {
    const renderFn = componentRegistry[item.type];

    if (!renderFn) return null;

    return renderFn(config, { iconMap, secondaryIconsMap, actionHandlers, props });
};

export default DynamicRenderer;
