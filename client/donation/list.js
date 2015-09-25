import React from 'react';

export default class DonationList extends React.Component {
  render() {
    return (
      <div>{this.props.donations.map(this._renderDonation)}</div>
    );
  }

  _renderDonation(donation, index) {
    return (
      <div key={index}>
        {donation.year} -
        <a href={donation.organization.url}> {donation.organization.text}</a>
      </div>
    );
  }
}

DonationList.propTypes = {
  donations: React.PropTypes.array.isRequired,
};
