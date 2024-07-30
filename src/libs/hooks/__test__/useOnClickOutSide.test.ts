import { act, renderHook } from "@testing-library/react";

import { useOnClickOutside } from "../useOnClickOutside";

describe("useOnClickOutside hook", () => {
  it("Should call handler when clicking outside the ref element", () => {
    const handler = jest.fn();
    const ref = { current: document.createElement("div") };

    renderHook(() => useOnClickOutside(ref, handler));

    // Simulate a click event outside the ref element
    act(() => {
      document.dispatchEvent(new Event("mousedown"));
    });

    expect(handler).toHaveBeenCalled();
  });

  it("Should not call handler when clicking inside the ref element", () => {
    const handler = jest.fn();
    const ref = { current: document.createElement("div") };

    renderHook(() => useOnClickOutside(ref, handler));

    // Simulate a click event inside the ref element
    act(() => {
      ref.current.dispatchEvent(new Event("mousedown"));
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it("Should remove event listeners on unmount", () => {
    const handler = jest.fn();
    const ref = { current: document.createElement("div") };

    const { unmount } = renderHook(() => useOnClickOutside(ref, handler));

    // Simulate unmounting the component
    act(() => {
      unmount();
    });

    // Simulate a click event outside the ref element after unmount
    act(() => {
      document.dispatchEvent(new Event("mousedown"));
    });

    expect(handler).not.toHaveBeenCalled();
  });
});
