/**********************************************************************
 * Copyright (C) 2023 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ***********************************************************************/

import { beforeAll, beforeEach, expect, expectTypeOf, test, vi } from 'vitest';
import { MenuRegistry } from './menu-registry';

let menuRegistry;

beforeAll(() => {
  menuRegistry = new MenuRegistry();
  const manifest = {
    contributes: {
      menus: {
        'dashboard/image': [
          {
            command: 'image.command1',
            title: 'Image 1',
          },
        ],
        'dashboard/container': [
          {
            command: 'container.command1',
            title: 'Container 1',
          },
          {
            command: 'container.command2',
            title: 'Container 2',
          },
        ],
      },
    },
  };
  menuRegistry.registerMenus(manifest.contributes.menus);
});

beforeEach(() => {
  vi.clearAllMocks();
});

test('Should return empty array for unknown context', async () => {
  const menus = menuRegistry.getContributedMenus('unknownContext');
  expect(menus).toBeDefined();
  expectTypeOf(menus).toBeArray();
  expect(menus.length).toBe(0);
});

test('Image context should have a single entry', async () => {
  const menus = menuRegistry.getContributedMenus('dashboard/image');
  expect(menus).toBeDefined();
  expectTypeOf(menus).toBeArray();
  expect(menus.length).toBe(1);
  expect(menus[0].command).toBe('image.command1');
  expect(menus[0].title).toBe('Image 1');
});

test('Container context should have two entries', async () => {
  const menus = menuRegistry.getContributedMenus('dashboard/container');
  expect(menus).toBeDefined();
  expectTypeOf(menus).toBeArray();
  expect(menus.length).toBe(2);
  expect(menus[0].command).toBe('container.command1');
  expect(menus[0].title).toBe('Container 1');
  expect(menus[1].command).toBe('container.command2');
  expect(menus[1].title).toBe('Container 2');
});
