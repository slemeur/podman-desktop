/**********************************************************************
 * Copyright (C) 2022 Red Hat, Inc.
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

export interface ContributionInfo {
  id: string;
  extensionId: string;
  name: string;
  type: string;
  uiUri: string;

  // base64 encoded icon in format: 'data:image/svg+xml;base64,<content>'
  icon: string;

  // path to be added when executing commands on the host
  hostEnvPath: string;

  // root storage path
  storagePath: string;
}
