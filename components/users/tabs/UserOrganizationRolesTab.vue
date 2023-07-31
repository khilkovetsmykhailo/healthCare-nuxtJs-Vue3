<template>
  <b-tab title="Organizations">
    <b-table-simple>
      <b-thead head-variant="light">
        <b-th>Organization</b-th>
        <b-th colspan="2">Role</b-th>
      </b-thead>
      <b-tbody>
        <b-tr
          v-for="userOrganizationRole,i in organizationRoles"
          :key="i"
        >
          <b-td>
            {{ userOrganizationRole.organizationRole.Organization.name }}
          </b-td>
          <b-td>
            <span class="text-capitalize">{{ userOrganizationRole.type }}</span><br/>
            <span class="small text-muted">
              Updated {{ $moment(userOrganizationRole.organizationRole.createdAt).fromNow() }}
            </span>
          </b-td>
          <b-td class="text-right">
            <b-button
              v-if="currentUserIsSystemAdministrator"
              size="sm"
              class="my-0"
              variant="outline-danger"
              disabled
            >
              Delete (coming soon)
            </b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </b-tab>
</template>

<script>
import getAllOrganizationRoles from '../../../util/user/getAllOrganizationRoles'

export default {
  name: 'ex-user-organization-roles-tab',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    organizationRoles() {
      return getAllOrganizationRoles(this.user)
    },
  },
}
</script>
