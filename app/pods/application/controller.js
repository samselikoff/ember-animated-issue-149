import Controller from "@ember/controller";
import { fadeIn, fadeOut } from "ember-animated/motions/opacity";
import move from "ember-animated/motions/move";
import { wait } from "ember-animated";

export default Controller.extend({
  *transitionA({ duration, insertedSprites, removedSprites }) {
    if (insertedSprites.length) {
      for (let sprite of insertedSprites) {
        sprite.element
          .querySelector('[data-animation-id="article-body"]')
          .animate([{ opacity: 0 }, { opacity: 1 }], {
            fill: "backwards",
            delay: duration / 2,
            duration: duration / 2
          });

        sprite.startTranslatedBy(window.innerWidth, 0);
        move(sprite, { duration: duration / 2 });
      }
    }

    if (removedSprites.length) {
      for (let sprite of removedSprites) {
        sprite.element
          .querySelector('[data-animation-id="article-body"]')
          .animate([{ opacity: 1 }, { opacity: 0 }], {
            fill: "forwards",
            duration: duration / 2
          });

        yield wait(duration / 2);

        sprite.endTranslatedBy(window.innerWidth, 0);
        move(sprite, { duration: duration / 2 });
      }
    }
  },

  *transitionBParent({ duration, insertedSprites, removedSprites }) {
    for (let sprite of insertedSprites) {
      sprite.startTranslatedBy(window.innerWidth, 0);
      move(sprite, { duration: duration / 2 });
    }

    if (removedSprites.length) {
      yield wait(duration / 2);

      removedSprites.forEach(sprite => {
        sprite.endTranslatedBy(window.innerWidth, 0);
        move(sprite, { duration: duration / 2 });
      });
    }
  },

  *transitionBChild({ duration, insertedSprites, removedSprites }) {
    for (let sprite of removedSprites) {
      fadeOut(sprite, { duration: duration / 2 });
    }

    yield wait(duration / 2);

    for (let sprite of insertedSprites) {
      fadeIn(sprite, { duration: duration / 2 });
    }
  }
});
