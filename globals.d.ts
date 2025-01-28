interface ViewTransitionWithTypes extends ViewTransition {
  types: Set;
}

interface PageRevealEvent extends Event {
  /**
   * The PageRevealEvent event object is made available inside handler functions for the pagereveal event.
   *
   * During a cross-document navigation, it allows you to manipulate a related view transition
   * (providing access to the relevant ViewTransition object) from the document being navigated to, if a view
   * transition was triggered by the navigation.
   *
   * Outside view transitions, this event is also useful for cases such as triggering a startup animation, or
   * reporting a page view. It's equivalent to the first Window.requestAnimationFrame() run after a cross-document
   * navigation, if you were to trigger requestAnimationFrame() in the <head> of the document. For example, if you ran
   * the following reveal() function in the <head>:
   *
   * [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/PageRevealEvent)
   */
  readonly viewTransition?: ViewTransitionWithTypes;
}

interface PageRevealEventInit extends EventInit {
  viewTransition?: ViewTransitionWithTypes;
}

declare var PageRevealEvent: {
  prototype: PageRevealEvent;
  new(type: string, eventInitDict?: PageRevealEventInit): PageRevealEvent;
};

enum NavigationType {
  'push' = 'push',
  'replace' = 'replace',
  'reload' = 'reload',
  'traverse' = 'traverse',
}

declare var navigation: {
  activation: {
    entry: {
      index: number;
    };
    from: {
      index: number;
    };
    navigationType: NavigationType;
  };
};
