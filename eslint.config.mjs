import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptParser from "@typescript-eslint/parser";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // TypeScript and React configuration
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      ".next/**",
      "out/**", 
      "dist/**",
      "build/**",
      "node_modules/**",
      "*.config.*",
      "public/**"
    ],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "import": importPlugin,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
      react: {
        version: "detect",
      },
    },
    rules: {
      // === Import/Export Rules (インポート順序とエクスポート規約) ===
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",          // Node.js built-in modules
            "external",         // npm packages
            "internal",         // Internal modules
            "parent",           // Parent directories
            "sibling",          // Same directory
            "index",            // Index files
            "type"              // Type imports
          ],
          "pathGroups": [
            // 1. React関連を最初に
            {
              "pattern": "react",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "react/**",
              "group": "external",
              "position": "before"
            },
            // 2. Next.js関連
            {
              "pattern": "next",
              "group": "external",
              "position": "before"
            },
            {
              "pattern": "next/**",
              "group": "external",
              "position": "before"
            },
            // 3. 外部ライブラリ（framer-motion等）
            {
              "pattern": "@/**",
              "group": "internal",
              "position": "after"
            },
            // 4. CSS Modulesを最後に
            {
              "pattern": "**/*.module.css",
              "group": "sibling",
              "position": "after"
            }
          ],
          "pathGroupsExcludedImportTypes": ["react", "next"],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ],

      // === Naming Convention Rules (命名規約) ===
      "@typescript-eslint/naming-convention": [
        "error",
        // Components: PascalCase
        {
          "selector": "function",
          "filter": {
            "regex": "^[A-Z]",
            "match": true
          },
          "format": ["PascalCase"]
        },
        // Variables and functions: camelCase
        {
          "selector": "variableLike", 
          "format": ["camelCase"],
          "leadingUnderscore": "allow"
        },
        // Constants: UPPER_CASE or camelCase
        {
          "selector": "variable",
          "modifiers": ["const"],
          "format": ["camelCase", "UPPER_CASE", "PascalCase"]
        },
        // TypeScript interfaces: PascalCase
        {
          "selector": "interface",
          "format": ["PascalCase"]
        },
        // TypeScript types: PascalCase
        {
          "selector": "typeAlias",
          "format": ["PascalCase"]
        },
        // Enum: PascalCase
        {
          "selector": "enum",
          "format": ["PascalCase"]
        },
        // Custom hooks: camelCase starting with 'use'
        {
          "selector": "function",
          "filter": {
            "regex": "^use[A-Z]",
            "match": true
          },
          "format": ["camelCase"]
        }
      ],

      // === TypeScript Rules ===
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-var-requires": "error",

      // === React Rules ===
      "react/prop-types": "off", // TypeScriptを使用するためoff
      "react/react-in-jsx-scope": "off", // Next.js 13+では不要
      "react/jsx-uses-react": "off", // Next.js 13+では不要
      "react/jsx-filename-extension": [
        "error",
        { "extensions": [".jsx", ".tsx"] }
      ],
      "react/function-component-definition": [
        "error",
        {
          "namedComponents": "function-declaration",
          "unnamedComponents": "arrow-function"
        }
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // === General Code Quality Rules ===
      "prefer-const": "error",
      "no-var": "error",
      "no-console": "warn",
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      
      // === Formatting Rules ===
      "indent": ["error", 2],
      "quotes": ["error", "single", { "avoidEscape": true }],
      "semi": ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      
      // === Next.js Specific Rules ===
      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",
      
      // === Import/Export Best Practices ===
      "import/no-default-export": "off", // Next.jsページではdefault exportが必要
      "import/prefer-default-export": "off",
      "import/no-unresolved": "error",
      "import/no-cycle": "error",
      "import/no-self-import": "error",
      
      // === Performance and Best Practices ===
      "no-duplicate-imports": "error",
      "no-unused-expressions": "error",
      "no-undef": "off", // TypeScriptで処理
      "no-redeclare": "off", // TypeScriptで処理
      "@typescript-eslint/no-redeclare": "error",
    },
  },

  // === Page components specific rules ===
  {
    files: ["src/app/**/page.tsx", "src/app/**/layout.tsx"],
    rules: {
      "import/no-default-export": "off", // Pagesはdefault exportが必要
      "react/function-component-definition": [
        "error",
        {
          "namedComponents": "function-declaration"
        }
      ],
    },
  },

  // === Component specific rules ===
  {
    files: ["src/components/**/*.tsx"],
    rules: {
      // Componentsはdefault exportを推奨
      "import/prefer-default-export": "error",
      "react/function-component-definition": [
        "error",
        {
          "namedComponents": "function-declaration"
        }
      ],
    },
  },

  // === Hook specific rules ===
  {
    files: ["src/hooks/**/*.ts", "src/hooks/**/*.tsx"],
    rules: {
      // Custom hooksは'use'で始まる必要がある
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "function",
          "format": ["camelCase"],
          "custom": {
            "regex": "^use[A-Z]",
            "match": true
          }
        }
      ],
    },
  },

  // === Constants specific rules ===
  {
    files: ["src/constants/**/*.ts"],
    rules: {
      // 定数ファイルでは名前付きexportを推奨
      "import/prefer-default-export": "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "variable",
          "modifiers": ["exported"],
          "format": ["camelCase", "UPPER_CASE", "PascalCase"]
        }
      ],
    },
  },

  // === Utility specific rules ===
  {
    files: ["src/utils/**/*.ts"],
    rules: {
      // UtilityファイルではESLintの関数命名を緩和
      "@typescript-eslint/naming-convention": "off",
    },
  },
];

export default eslintConfig;
