# React Add TODO Form

Реалізуйте можливість додавати TODO до `TodoList`, реалізованого в завданні **Static List of TODOs**.

> Ось [приклад роботи застосунку](https://mate-academy.github.io/react_add-todo-form/)

1. Створіть компонент `App`, який зберігатиме масив `todos` і відображатиме його за допомогою `TodoList`.
1. Створіть форму для додавання нових TODO:

- додайте текстове поле для `title` з атрибутом `data-cy="titleInput"`;
- додайте `<select>` з атрибутом `data-cy="userSelect"`, який показує всіх наданих користувачів;
- додайте підписи (labels) і підказки (placeholders) там, де це потрібно;
- після натискання кнопки `Add` додавайте новий todo до списку;
- кожен TODO має містити поля:
  - `id`,
  - `title`,
  - `userId`,
  - `completed` (`false` за замовчуванням),
  - а також об’єкт `user`, що містить: `id`, `name`, `username`, `email`;
- `id` — це найбільший `id` у масиві + 1 (додайте атрибут `data-id={todo.id}` для кожного `.TodoInfo`).

1. Додайте валідацію форми:

- додайте до `select` порожній варіант за замовчуванням `Choose a user`;
- перед створенням todo перевіряйте, чи вибрано `user`; якщо ні — показуйте повідомлення про помилку біля `select` (`Please choose a user`);
- якщо поле `title` порожнє — показуйте повідомлення про помилку біля поля `title` (`Please enter a title`);
- помилки мають з’являтися лише після натискання кнопки `Add`;
- ховайте повідомлення одразу після будь-якої зміни поля з помилкою.

1. Якщо форма валідна — додайте todo до списку та очистьте форму.
1. (необов’язково) Дозвольте вводити в `title` лише літери (`ua` і `en`), цифри та пробіли. Просто видаляйте інші символи з `title`.

## Інструкції

- Встановіть розширення Prettier та використайте ці [налаштування VSCode](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) для форматування під час збереження.
- Реалізуйте розв’язок відповідно до [гайдлайну по React задачам](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Користуйтеся [шпаргалкою з React TypeScript](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- В окремому терміналі запустіть тести командою `npm test`, щоб переконатися, що рішення коректне.
- Замініть `<your_account>` на ваш GitHub юзернейм у [DEMO LINK](https://<your_account>.github.io/react_add-todo-form/) і додайте посилання до опису PR.
