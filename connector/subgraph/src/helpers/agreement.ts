import { BigInt, log } from '@graphprotocol/graph-ts'
import {
  CollateralRequirement as CollateralRequirementEntity,
  Proposal as ProposalEntity,
} from '../../generated/schema'
import {
  ConvictionVoting as ConvictionVotingContract,
  ProposalAdded as ProposalAddedEvent,
} from '../../generated/templates/ConvictionVoting/ConvictionVoting'
import { Agreement as AgreementContract } from '../../generated/templates/Agreement/Agreement'

import { loadTokenData } from './'

export function populateCollateralData(
  proposal: ProposalEntity | null,
  event: ProposalAddedEvent
): void {
  const ABSTAIN_PROPOSAL_ID = BigInt.fromI32(1)

  if (event.params.id != ABSTAIN_PROPOSAL_ID) {
    const convictionVotingApp = ConvictionVotingContract.bind(event.address)
    const agreementAppAddress = convictionVotingApp.getAgreement()
    const agreementApp = AgreementContract.bind(agreementAppAddress)
    const actionData = agreementApp.getAction(proposal.actionId)
    const collateralRequirementData = agreementApp.getCollateralRequirement(
      event.address,
      actionData.value2
    )
    const collateralRequirement = new CollateralRequirementEntity(proposal.id)

    collateralRequirement.proposal = proposal.id
    const collateralTokenId = loadTokenData(collateralRequirementData.value0)

    if (collateralTokenId) {
      collateralRequirement.token = collateralRequirementData.value0.toHexString()
    }

    collateralRequirement.challengeDuration = collateralRequirementData.value1
    collateralRequirement.actionAmount = collateralRequirementData.value2
    collateralRequirement.challengeAmount = collateralRequirementData.value3
    collateralRequirement.save()
  }
}
